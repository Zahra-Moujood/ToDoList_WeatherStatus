import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // weather funtion and api key which is taken from openweathermap
  // i created account on Open Weather Map and got api key
  // my api key is "13ef5c02ce1ec75af11e6af8cf013ef8"
  // fetch weather data
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
      {/* Title */}
      <Text style={styles.title}>Weather Status</Text>
      {/* Input for city */}
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      
        {/* Button to check weather */}
      <TouchableOpacity style={styles.addButton} onPress={getWeather}>
        <Text style={styles.addButtonText}>Check Weather</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="blue" />}
       {/* Display weather data */}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>City: {weather.name}</Text>
          <Text style={styles.weatherText}>Temperature: {weather.main?.temp}°C</Text>
          <Text style={styles.weatherText}>Condition: {weather.weather?.[0]?.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E2D09C', padding: 20, marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#003366', marginBottom: 20, textAlign: 'center' },
  input: { borderColor: '#E2D09C', borderWidth: 1, borderRadius: 10, marginBottom: 10, padding: 14, backgroundColor: '#fff' },
  addButton: { flexDirection: 'row', backgroundColor: '#B23D3D', padding: 14, borderRadius: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  weatherText: { fontSize: 16, color: '#003366', marginBottom: 2 },
  weatherContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
});
