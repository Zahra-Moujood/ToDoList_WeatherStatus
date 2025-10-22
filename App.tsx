import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import TodoScreen from './screens/TodoScreen';
import WeatherScreen from './screens/WeatherScreen';

// creating bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      {/* Bottom tab navigation setup */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // icons setup for each tabs - weather and to-do list
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof FontAwesome.glyphMap = 'list';
            if (route.name === 'Weather') {
              iconName = 'cloud';
            } else if (route.name === 'To-Do List') {
              iconName = 'list';
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#B23D3D', // Active tab color
          tabBarInactiveTintColor: 'gray',  // Inactive tab color
          headerShown: false, 
        })}
      >
        {/* To-Do List screen */}
        <Tab.Screen name="To-Do List" component={TodoScreen} />
        {/* Weather screen */}
        <Tab.Screen name="Weather" component={WeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
