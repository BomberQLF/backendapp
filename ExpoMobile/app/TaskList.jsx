import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';
import Task from './task';
import AddTask from './AddTask';
import UserConnect from './userconnect';
import AddList from './AddList';
import ListItem from './ListItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [showAddList, setShowAddList] = useState(false);

  //permet de faire l'animation
  const slideAnim = useState(new Animated.Value(0))[0];

  const fetchTasks = async (listId) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`${API_URL}/task/by-list/${listId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.ok) setTasks(data.data);
  };

  const fetchLists = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`${API_URL}/list`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.ok) {
      setLists(data.data);
      if (data.data.length > 0 && !selectedList) {
        setSelectedList(data.data[0]._id);
      }
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  //animation slide down
  useEffect(() => {
    if (selectedList) {
      fetchTasks(selectedList);
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedList]);

  const handleTaskAdded = () => {
    if (selectedList) {
      fetchTasks(selectedList);
    }
  };

  const handleListAdded = () => {
    fetchLists();
    setShowAddList(false);
  };

  const handleStatusChange = (id, completed, deleted = false, newTitle) => {
    if (deleted) {
      // On met à jour l'état 'tasks' en supprimant la tâche 
      setTasks(tasks => tasks.filter(task => task._id !== id));
      // modification du titre de la tache
    } else if (newTitle !== undefined) {
      setTasks(tasks =>
        tasks.map(task =>
          task._id === id ? { ...task, title: newTitle } : task
        )
      );
    } else {
      // mise a jout du statut de la tache
      setTasks(tasks =>
        tasks.map(task =>
          task._id === id ? { ...task, completed } : task
        )
      );
    }
  };


  // si la liste sélectionnée change, on fetch les tâches de cette liste
  const handleListChange = (id, deleted = false, newName) => {
    if (deleted) {
      setLists(lists => lists.filter(list => list._id !== id));
      if (selectedList === id) {
        const remainingLists = lists.filter(list => list._id !== id);
        setSelectedList(remainingLists.length > 0 ? remainingLists[0]._id : null);
      }
    } else if (newName !== undefined) {
      setLists(lists =>
        lists.map(list =>
          list._id === id ? { ...list, name: newName, title: newName } : list
        )
      );
    }
  };

  // permet de récupérer le nom de la liste sélectionnée
  const getSelectedListName = () => {
    const list = lists.find(l => l._id === selectedList);
    return list ? list.name : '';
  };


  // Calcul des statistiques des tâches
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <View style={styles.container}>

      {/* Header avec les catégories en bulles  */}
      <View style={styles.header}>
        <UserConnect />
        <Text style={styles.headerTitle}>Mes listes</Text>
        <ScrollView
          horizontal
          // permet de ne pas afficher la barre de défilement horizontale
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >

          {lists.map((list, index) => (
            <TouchableOpacity
              key={list._id}
              style={[
                styles.categorybulle,
                selectedList === list._id && styles.categorybulleActive,
                { backgroundColor: getCategoryColor(index) }
              ]}
              onPress={() => setSelectedList(list._id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.categorybulleText,
                selectedList === list._id && styles.categorybulleTextActive
              ]}>
                {list.name}
              </Text>
              {selectedList === list._id && (
                <View style={styles.categoryIndicator} />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.addCategorybulle}
            onPress={() => setShowAddList(!showAddList)}
            activeOpacity={0.7}
          >
            <Text style={styles.addCategoryText}>+ Nouvelle</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {showAddList && (
        <View style={styles.addListContainer}>
          <AddList onListAdded={handleListAdded} />
        </View>
      )}

      {/* Liste sélectionnée avec édition */}
      {selectedList && (
        <View style={styles.selectedListHeader}>
          <View style={styles.listHeaderContent}>
            <ListItem
              _id={selectedList}
              name={getSelectedListName()}
              onListChange={handleListChange}
            />
          </View>
        </View>
      )}

      <ScrollView>
        {selectedList ? (
          <View style={styles.mainContent}>
            {totalCount > 0 && (
              <View style={styles.statsCard}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{totalCount}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{completedCount}</Text>
                  <Text style={styles.statLabel}>Terminées</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{totalCount - completedCount}</Text>
                  <Text style={styles.statLabel}>Restantes</Text>
                </View>
              </View>
            )}

            {/* Formulaire ajout de tâche */}
            <AddTask onTaskAdded={handleTaskAdded} listId={selectedList} />

            {/* Liste des tâches */}
            <ScrollView
              style={styles.tasksScrollView}
              contentContainerStyle={styles.tasksContent}
              showsVerticalScrollIndicator={false}
            >
              {tasks.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyEmoji}>📝</Text>
                  <Text style={styles.emptyStateText}>Aucune tâche</Text>
                </View>
              ) : (
                <>
                  {/* Tâches non terminées */}
                  {tasks.filter(t => !t.completed).length > 0 && (
                    <View style={styles.taskSection}>
                      <Text style={styles.sectionTitle}>À faire</Text>
                      {tasks.filter(t => !t.completed).map((task) => (
                        <Task
                          key={task._id}
                          _id={task._id}
                          title={task.title}
                          completed={task.completed}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </View>
                  )}

                  {/* Tâches terminées */}
                  {tasks.filter(t => t.completed).length > 0 && (
                    <View style={styles.taskSection}>
                      <Text style={styles.sectionTitle}>
                        Terminées ({tasks.filter(t => t.completed).length})
                      </Text>
                      {tasks.filter(t => t.completed).map((task) => (
                        <Task
                          key={task._id}
                          _id={task._id}
                          title={task.title}
                          completed={task.completed}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>

        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyStateText}>Créez votre première liste</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}


//Pour le style de cette page je me suis aidée de L'ia

// Fonction pour générer des couleurs pastel dynamiques
const getCategoryColor = (index) => {
  const colors = [
    '#c9e1f6ff',
    '#f6dcf6ff',
    '#f0dbbeff',
    '#c7f7c7ff',
    '#e1c5f2ff',
    '#f5b9deff',
    '#bef8f8ff',
    '#eeeea7ff',
  ];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  categoriesScroll: {
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  categorybulle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 100,
    alignItems: 'center',
  },
  categorybulleActive: {
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categorybulleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.2,
  },
  categorybulleTextActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  addCategorybulle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    minWidth: 120,
    alignItems: 'center',
  },
  addCategoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
  },
  addListContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedListHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 8,
  },
  listHeaderContent: {
    paddingHorizontal: 20,
  },
  mainContent: {
    flex: 1,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 12,
  },
  tasksScrollView: {
    flex: 1,
  },
  tasksContent: {
    paddingBottom: 32,
  },
  taskSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  }
});