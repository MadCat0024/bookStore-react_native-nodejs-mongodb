import * as React from 'react';
import {useEffect, useState} from 'react';
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHouse, faList, faAddressBook,faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './tab/home';
import List from './tab/author';
import Author from './tab/list';
import LogOut from './tab/logout';

const BottomTab = createBottomTabNavigator();
const homeName = "home";
const listname = "list";
const author = "author";
const logout = "logout"
const Tab =()=>{
    return (
        <BottomTab.Navigator>
        <BottomTab.Screen 
        name='home' 
        component={HomeScreen}
        options={({ route, navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
                <FontAwesomeIcon icon={faHouse} />
            ),
            tabBarLabel: 'Trang chủ',
            tabBarLabelStyle: {
                fontSize: 14
            }
        })}
         />
        <BottomTab.Screen 
        name='list' 
        component={List}  
        options={({ route, navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
                <FontAwesomeIcon icon={faList} />
            ),
            tabBarLabel: 'Danh muc',
            tabBarLabelStyle: {
                fontSize: 14
            }
        })}
        />
        <BottomTab.Screen 
        name='author' 
        component={Author} 
        options={({ route, navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
                //<Icon name="archive" color={color} size={size} />
                <FontAwesomeIcon icon={faAddressBook} />
            ),
            tabBarLabel: 'Tác giả',
            tabBarLabelStyle: {
                fontSize: 14
            }
        })}
        />
        <BottomTab.Screen 
        name='logout'
         component={LogOut} 
         options={({ route, navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            ),
            tabBarLabel: 'Đăng xuất',
            tabBarLabelStyle: {
                fontSize: 14
            }
        })}
        />
      </BottomTab.Navigator>
    )
}
export default Tab