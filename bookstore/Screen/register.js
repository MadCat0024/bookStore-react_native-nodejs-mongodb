import * as React from 'react';
import {useState} from 'react';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
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

const showAlert = () =>
  Alert.alert(
    'Thông báo',
    'Bạn đã đăng ký thành công',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]
  );

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  const handleRegister = ()=>{
    const newUser = { 
      "email" : email, 
      "username": username,
      "password": password
    };
    //console.log(newUser)
    try {
      const res = axios.post("http://10.0.2.2:8000/v1/auth/register", newUser)
      //.then(res=> res.data)
      .then(data => {
          //console.log(data) 
          showAlert()
      })
      .then(console.log("ban da dang ky thanh cong")
      )
      setEmail('')
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle= "light-content"
        />
      <Text style={{fontSize:35,marginLeft:18,marginTop:10,color:"#3b3b3b"}}>Đăng ký</Text>
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
        
        >Tạo tài khoản</Text>
        
        <TextInput
        mode="outlined"
        label="Email"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        mode="outlined"
        value={username}
        label="Tên người dùng"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=> setUsername(text)}
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
        onPress={() => handleRegister()}>
        Đăng ký
      </Button>
      <TouchableOpacity>
        <Text
        style={{
          fontSize:18,marginLeft:18,marginTop:20
        }}
        onPress={()=>props.navigation.replace("login")}
        >
          Bạn đã có tài khoản?
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )


}


export default RegisterScreen

