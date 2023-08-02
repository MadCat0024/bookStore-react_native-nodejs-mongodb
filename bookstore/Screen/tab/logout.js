import * as React from 'react';
import {useEffect} from 'react';
import { Button, ToastAndroid } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import React,{useEffect,useState} from 'react';
import {
    Text
} from 'react-native';


const LogOut = (props) => {

  const getInfo = async()=>{
    username = await AsyncStorage.getItem('username');
    email = await AsyncStorage.getItem('email');
    if (username && email) {
      console.log("get info successfully")
    }else{
      console.log("get info failed")
    }
}
useEffect(()=>{
  getInfo();
},[])
  const handleLogout = async() =>{
    await AsyncStorage.removeItem("accessToken")
    await AsyncStorage.removeItem("refreshToken")
    await AsyncStorage.removeItem("username")
    await AsyncStorage.removeItem("email")
    .then(()=>{
      props.navigation.navigate('login')
    })
  }
  return (
    <>
       <Text>Xin chào</Text>   
       <Button mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        onPress={() => handleLogout()}>
        Đăng xuất
      </Button> 
    </>
  )


}


export default LogOut

