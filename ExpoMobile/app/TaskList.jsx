import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Task from './task';
import AddTask from './AddTask';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/task');
    const data = await response.json();
    if (data.ok) setTasks(data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
  };

  // mettre à jour l'état local après modification
const handleStatusChange = (id, completed, deleted = false, newTitle) => {
  if (deleted) {
    setTasks(tasks => tasks.filter(task => task._id !== id));
  } else if (newTitle !== undefined) {
    setTasks(tasks =>
      tasks.map(task =>
        task._id === id ? { ...task, title: newTitle } : task
      )
    );
  } else {
    setTasks(tasks =>
      tasks.map(task =>
        task._id === id ? { ...task, completed } : task
      )
    );
  }
};
  return (
    <View style={{ flex: 1, padding: 20 }}>
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
    </View>
  );
}