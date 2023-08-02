import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import { Button, TextInput } from 'react-native-paper';
// import React,{useEffect,useState} from 'react';
import {
ActivityIndicator, View, StyleSheet
} from 'react-native';


const LoadingScreen = (props) => {
  useEffect(()=>{
    const accessToken = async()=>{
        token = await AsyncStorage.getItem('accessToken');
        if (token) {
          props.navigation.navigate("home")
        }else{
          props.navigation.navigate("login")
        }
    }
    accessToken();

  },[])

  return (
    <>
        <View style= {style.loading}>
            <ActivityIndicator size="large" color="blue"/>
            
        </View>    
    </>
  )


}
const style = StyleSheet.create({
    loading:{flex: 1,
    justifyContent: 'center',
    alignItems: 'center'}
  })

export default LoadingScreen

