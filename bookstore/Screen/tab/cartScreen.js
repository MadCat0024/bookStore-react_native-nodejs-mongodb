import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route }) => {
  const { cartItems, setCartItems } = route.params;

  // Function to remove an item from the cart
  const removeFromCart = async (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    await storeCartItems(updatedCart);
  };

  // Function to store cart items in AsyncStorage
  const storeCartItems = async (items) => {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem('cartItems', jsonValue);
    } catch (error) {
      console.log('Error storing cart items:', error);
    }
  };

  // Function to retrieve cart items from AsyncStorage
  const getCartItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartItems');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log('Error retrieving cart items:', error);
      return [];
    }
  };

  // Load cart items from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    loadCartItems();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        ) : (
          cartItems.map(item => (
            <Card key={item._id} style={styles.card}>
              <Card.Title style={styles.title}>{item.name}</Card.Title>
              <View style={styles.cardContent}>
                <View style={styles.itemLeft}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: item.imgLink }}
                  />
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.name}> Tác giả: {item.author.name}</Text>
                  <Text style={styles.name}> Thể loại: {item.genres}</Text>
                  <Text style={styles.name}> Năm xuất bản: {item.publishedDate}</Text>
                  <Text style={styles.price}>{(item.price)?.toLocaleString()} VNĐ</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.removeFromCartButton}>
                <Text style={styles.removeFromCartButtonText}>Remove</Text>
              </TouchableOpacity>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    flex: 2,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  price: {
    fontSize: 22,
    color: 'red',
    fontWeight: '600',
  },
  image: {
    width: 100,
    height: 150,
  },
  removeFromCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc0000',
    borderRadius: 25,
    width: 100,
    alignSelf: 'flex-end',
  },
  removeFromCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CartScreen;
