import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";

//utilisation de AsyncStorage pour stocker le token utilisateur
export default function AddTask({ onTaskAdded, listId }: { onTaskAdded?: () => void, listId?: string }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async () => {
    setError(null);

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      setError("Non authentifié");
      return;
    }

      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: task, list: listId }),
      });
      
      const data = await response.json();
      if (!data.ok) {
        setError(data.error || "Erreur");
        return;
      }
      
      setTask("");
      if (onTaskAdded) onTaskAdded();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>✨</Text>
          <TextInput
            style={styles.input}
            placeholder="Nouvelle tâche..."
            placeholderTextColor="#AAAAAA"
            value={task}
            onChangeText={setTask}
            multiline
            onSubmitEditing={handleAddTask}
          />
        </View>

        <TouchableOpacity
          style={[styles.addButton, (!task) && styles.addButtonDisabled]}
          onPress={handleAddTask}
          disabled={!task}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFBFC',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
    paddingVertical: 4,
    maxHeight: 100,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
});