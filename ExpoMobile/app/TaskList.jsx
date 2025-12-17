import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';
import Task from './task';
import AddTask from './AddTask';
import UserConnect from './userconnect';
import AddList from './AddList';
import ListItem from './ListItem'; // Nouveau composant

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [showLists, setShowLists] = useState(true); // Toggle pour afficher listes ou tâches

  const fetchTasks = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`${API_URL}/task`, {
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
    if (data.ok) setLists(data.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchLists();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleListAdded = () => {
    fetchLists();
  };

  const handleStatusChange = (id, completed, deleted = false, newTitle) => {
    if (deleted) {
      setTasks(tasks => tasks.filter(task => task._id !== id));
    } 
  };

  const handleListChange = (id, deleted = false, newName) => {
    if (deleted) {
      setLists(lists => lists.filter(list => list._id !== id));
    } 
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UserConnect />

      {/* Boutons de toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showLists && styles.toggleButtonActive]}
          onPress={() => setShowLists(true)}
        >
          <Text style={[styles.toggleText, showLists && styles.toggleTextActive]}>
            Catégories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showLists && styles.toggleButtonActive]}
          onPress={() => setShowLists(false)}
        >
          <Text style={[styles.toggleText, !showLists && styles.toggleTextActive]}>
            Tâches
          </Text>
        </TouchableOpacity>
      </View>

      {showLists ? (
        <>
          <AddList onListAdded={handleListAdded} />
          <ScrollView>
            {lists.map((list) => (
              <ListItem
                key={list._id}
                _id={list._id}
                name={list.name}
                onListChange={handleListChange}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <AddTask onTaskAdded={handleTaskAdded} />
          <ScrollView>
            {tasks.map((task) => (
              <Task
                key={task._id}
                _id={task._id}
                title={task.title}
                completed={task.completed}
                onStatusChange={handleStatusChange}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tasksContainer: {
    flexGrow: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#0078d4',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
  },
  toggleTextActive: {
    color: '#ffffff',
  },
});