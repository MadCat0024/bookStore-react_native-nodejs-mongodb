import * as React from 'react';
import {useEffect, useState} from 'react';
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import React,{useEffect,useState} from 'react';
import {
  View,
  Text, 
} from 'react-native';
import RegisterScreen from './Screen/register';
import LoginScreen from './Screen/login';
import LoadingScreen from './Screen/loading';
import HomeScreen from './Screen/tab/home';
import Tab from './Screen/Tab';

const Stack = createNativeStackNavigator();
const App = () => {
  const [isLoggedIn, setLoggedIn ] = useState(false);
  useEffect(()=>{
    const accessToken = async()=>{
        token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setLoggedIn(true)  
        }else{
          setLoggedIn(false)
        }
    }
    accessToken();

  },[])

  return (
    
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="tab" component={Tab} />
          <Stack.Screen name="loanding" component={LoadingScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}
export default App

 
