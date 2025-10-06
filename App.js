import React, { useState } from "react";
import { Text, View, TextInput, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles'; 

export default function App() {
  const [task, setTask] = useState("");  
  const [tasks, setTasks] = useState([]);     

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;           
    const now = new Date();
    const dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    setTasks([...tasks, { key: Math.random().toString(), value: task, date: dateString }]); 
    setTask("");                            
  };

  // Delete Task
  const deleteTask = (key) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.key !== key));
  };
  const deleteAllTasks = () => {
    setTasks([]);
  };
// 
  return (
    <View style={styles.container}>
      {/* Title section with tick icon */}
      <View style={styles.titleContainer}>
        <FontAwesome name="check-circle" size={30} color="#003366" style={{ marginRight: 8 }} />
        <Text style={styles.title}>My To-Do List</Text>
      </View>

      {/* Input field */}
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      
      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <FontAwesome name="plus" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <View style={styles.taskItemContainer}>
            {/* Task number, text, and date */}
            <View>
              <Text style={styles.taskItem}>{index + 1}. {item.value}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            {/* Trash icon to delete individual task */}
            <TouchableOpacity onPress={() => deleteTask(item.key)}>
              <FontAwesome name="trash" size={20} color="#B23D3D" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Delete All Button */}
      {tasks.length > 0 && (
        <TouchableOpacity style={styles.deleteAllButton} onPress={deleteAllTasks}>
          <FontAwesome name="trash" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.deleteAllButtonText}>Delete All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
