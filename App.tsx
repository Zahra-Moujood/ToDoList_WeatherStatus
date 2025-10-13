import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // add task
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { key: String(Math.random()), value: task }]);
    setTask('');
  };

  // delete task
  const deleteTask = key => setTasks(tasks.filter(t => t.key !== key));

  // weather funtion and api key which is taken from openweathermap
  // i created account on open weather map and got api key
  // my api key is "13ef5c02ce1ec75af11e6af8cf013ef8"
  const getWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13ef5c02ce1ec75af11e6af8cf013ef8&units=metric`);
      const data = await res.json();
      if (data.cod === 200) setWeather(data);
      else alert('City not found');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/*Title for weather status*/}
      <Text style={styles.title}>Weather Status </Text>
      
      {/* input Weather  */}
      <TextInput style={styles.input} 
      placeholder="Enter city" 
      value={city} 
      onChangeText={setCity} 
      />
      {/* Button for get weather */}
      <TouchableOpacity style={styles.addButton} onPress={getWeather}>
        <Text style={styles.addButtonText}>Check Weather</Text>
      </TouchableOpacity>
      
      {/*output weather information*/}
      {loading && <ActivityIndicator size="large" color="blue" />}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>City: {weather.name}</Text>
          <Text style={styles.weatherText}>Temperature: {weather.main?.temp}°C</Text>
          <Text style={styles.weatherText}>Condition: {weather.weather?.[0]?.description}</Text>
        </View>
      )}


      {/* To-Do-List */}

      {/*Title for to-do-list*/}
      <Text style={styles.title}>To-Do-List </Text>

      {/* input task */}
      <TextInput style={styles.input} placeholder="Enter a task" value={task} onChangeText={setTask} />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      
      {/* output task list */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            <Text>{item.value}</Text>


            {/* delete task button */}
            <TouchableOpacity onPress={() => deleteTask(item.key)}>
              <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
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
  weatherText: { fontSize: 16, color: '#003366', marginBottom: 2 },
  weatherContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
});
