import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faList,
  faAddressBook,
  faArrowRightFromBracket,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from './tab/home';
import List from './tab/list';
import Author from './tab/author';
import LogOut from './tab/logout';
import CartScreen from './tab/cartScreen';

const BottomTab = createBottomTabNavigator();

const Tab = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          name='home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHouse} color={color} size={size} />
            ),
            tabBarLabel: 'Trang chủ',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />
        <BottomTab.Screen
          name='list'
          component={List}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faList} color={color} size={size} />
            ),
            tabBarLabel: 'Danh mục',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />
        <BottomTab.Screen
          name='author'
          component={Author}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faAddressBook} color={color} size={size} />
            ),
            tabBarLabel: 'Tác giả',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />
        <BottomTab.Screen
          name='cart'
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faShoppingCart} color={color} size={size} />
            ),
            tabBarLabel: 'Giỏ hàng',
          }}
        >
          {() => <CartScreen cartItems={cartItems} setCartItems={setCartItems} />}
        </BottomTab.Screen>
        <BottomTab.Screen
          name='logout'
          component={LogOut}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faArrowRightFromBracket} color={color} size={size} />
            ),
            tabBarLabel: 'Đăng xuất',
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />
      </BottomTab.Navigator>
        );
};

export default Tab;
