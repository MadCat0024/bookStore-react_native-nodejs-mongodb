import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowDown, faArrowUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const [product, setProduct] = useState([]);
  const [sortedAsc, setSortedAsc] = useState(false);
  const navigation = useNavigation();

  // Add state for cart management
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  useEffect(() => {
    axios.get("http://10.0.2.2:8000/v1/book/")
      .then(res => {
        let value = res.data;
        setProduct(value);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const sortData = () => {
    // Toggle the sorting order (ascending or descending) when the button is pressed
    setSortedAsc(!sortedAsc);

    // Sort the products based on price
    const sortedProducts = product.slice().sort((a, b) => {
      if (sortedAsc) {
        return a.price - b.price; // Ascending order
      } else {
        return b.price - a.price; // Descending order
      }
    });

    setProduct(sortedProducts);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {product.map(product => (
            <Card key={product._id} style={styles.card}>
              <Card.Title style={styles.title}>{product.name}</Card.Title>
              <View style={styles.cardContent}>
                <View style={styles.itemLeft}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: product.imgLink }}
                  />
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.name}> Tác giả: {product.author.name}</Text>
                  <Text style={styles.name}> Thể loại: {product.genres}</Text>
                  <Text style={styles.name}> Năm xuất bản: {product.publishedDate}</Text>
                  <Text style={styles.price}>{(product.price)?.toLocaleString()} VNĐ</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => addToCart(product)} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
      {/* Navigate to CartScreen passing the 'cartItems' and 'setCartItems' props */}
      <View style={styles.sortButtons}>
        <TouchableOpacity onPress={sortData} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>
            {sortedAsc ? (
              <Text>
                Giá tăng dần <FontAwesomeIcon icon={faArrowUp} />
              </Text>
            ) : (
              <Text>Giá giảm dần <FontAwesomeIcon icon={faArrowDown}/></Text>
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('cart', { cartItems, setCartItems })} style={styles.goToCartButton}>
          <Text style={styles.goToCartButtonText}>Go to Cart <FontAwesomeIcon icon={faShoppingCart}/></Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    flex: 2,
    marginLeft: 10,
  },
  title: {
    fontSize: 26,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  price: {
    fontSize: 22,
    color: "red",
    fontWeight: "600",
  },
  image: {
    width: 100,
    height: 150,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-start',
    marginBottom: 10,
  },
  sortButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FD866F',
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  sortButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addToCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FD866F',
    borderRadius: 8,
    width: 120,
    alignSelf: 'flex-end',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  goToCartButton: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#FD866F',
    borderRadius: 8,
    width: 50,
    height:50,
    alignSelf: 'flex-end',
  },
  goToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
