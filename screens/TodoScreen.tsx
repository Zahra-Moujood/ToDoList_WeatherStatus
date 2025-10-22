import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TodoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ key: string; value: string; completed: boolean }[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Add task
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { key: String(Math.random()), value: task, completed: false }]);
    setTask('');
  };

  // Delete task
  const deleteTask = (key: string) => setTasks(tasks.filter(t => t.key !== key));

  // Mark as completed
  const toggleComplete = (key: string) => {
    setTasks(tasks.map(t => (t.key === key ? { ...t, completed: !t.completed } : t)));
  };

  // editing task
  const startEditing = (key: string, value: string) => {
    setEditingKey(key);
    setEditText(value);
  };

  // Save edited task
  const saveEdit = (key: string) => {
    if (!editText.trim()) return;
    setTasks(tasks.map(t => (t.key === key ? { ...t, value: editText } : t)));
    setEditingKey(null);
    setEditText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* InputBox for adding new task */}
      <TextInput
        style={styles.input}
        placeholder="Title - Description"
        value={task}
        onChangeText={setTask}
      />
      {/* Button to add task */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            {/* Mark as Complete option - before it shows gray and after the completion it shows green */}
            <TouchableOpacity onPress={() => toggleComplete(item.key)}>
              <FontAwesome
                name={item.completed ? 'check-square' : 'square-o'}
                size={25}
                color={item.completed ? 'green' : 'gray'}
              />
            </TouchableOpacity>

            {/* Edit the task after adding  */}
            {editingKey === item.key ? (
              <TextInput
                style={styles.editInput}
                value={editText}
                onChangeText={setEditText}
                onSubmitEditing={() => saveEdit(item.key)}
                autoFocus
              />
            ) : (
              <Text
                style={[styles.taskText, item.completed && styles.completedTask]}
                onPress={() => toggleComplete(item.key)}
              >
                {item.value}
              </Text>
            )}

            {/* EDIT ,SAVE ,DELETE BUTTONS */}
            <View style={styles.iconContainer}>
              {editingKey === item.key ? (
                <TouchableOpacity onPress={() => saveEdit(item.key)}>
                  <FontAwesome name="save" size={25} color="#003366" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => startEditing(item.key, item.value)}>
                  <FontAwesome name="edit" size={25} color="#003366" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteTask(item.key)}>
                <FontAwesome name="trash" size={25} color="#B23D3D" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E2D09C', padding: 20, marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#003366', marginBottom: 20, textAlign: 'center' },
  input: { borderColor: '#E2D09C', borderWidth: 1, borderRadius: 10, marginBottom: 10, padding: 14, backgroundColor: '#fff' },
  addButton: { flexDirection: 'row', backgroundColor: '#B23D3D', padding: 14, borderRadius: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  taskItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 14, marginVertical: 6, borderRadius: 10 },
  taskText: { flex: 1, marginHorizontal: 10, fontSize: 16 },
  completedTask: { color: 'green' },
  editInput: { flex: 1, marginHorizontal: 10, padding: 4 },
  iconContainer: { flexDirection: 'row', gap: 10 },
});