import * as React from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DOMAIN } from '../baseURL/url';
import { Button, TextInput } from 'react-native-paper';
// import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';


const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = ()=>{
    const confirmUser = { 
      "email" : email, 
      "password": password
    }
    // console.log(confirmUser)
  
      const res = axios.post("http://10.0.2.2:8000/v1/auth/login", confirmUser)
      .then(res=> res.data)
      .then(async data => {
        //console.log(data)
        try {
          await AsyncStorage.setItem('accessToken', data.accessToken);
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
          await AsyncStorage.setItem('username', data.others.username);
          await AsyncStorage.setItem('email', data.others.email);
        
          //await AsyncStorage.setItem('_id', data._id);
          props.navigation.navigate('tab')
        } catch (err) {
          console.log(err)
        }
      })
      .then(console.log("ban da dang nhap thanh cong"))
      setEmail('')
      setPassword('')
  }

  
  return (
    <KeyboardAvoidingView behavior='position'>
      <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle= "light-content"
        />
      <Text style={{fontSize:35,marginLeft:18,marginTop:10,color:"#3b3b3b"}}>Đăng nhập</Text>
      <View
        style={{
          borderBottomColor:"blue",
          borderBottomWidth:4,
          borderRadius:10,
          marginLeft:20,
          marginRight:150,
          marginTop:4
        }}
        />
        <Text
        style={{
          fontSize:20,marginLeft:18,marginTop:20
        }}
        
        >Đăng nhập</Text>
        
        <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text)=>{setEmail(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
      />

      

        <TextInput
          label='Mật khẩu'
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(text)=>{setPassword(text)}}
          style={{marginLeft:18,marginRight:18,marginTop:18}}
          theme={{colors:{primary:"blue"}}}
      
        />
      <Button mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        onPress={() => handleLogin()}>
        Đăng nhập
      </Button>
      <TouchableOpacity>
        <Text
        style={{
          fontSize:18,marginLeft:18,marginTop:20
        }}
        onPress={()=>props.navigation.replace("register")}
        >
          Bạn chưa có tài khoản?
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )


}


export default LoginScreen

