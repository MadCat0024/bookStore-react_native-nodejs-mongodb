import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Card, Button, Icon } from '@rneui/themed';
import axios from 'axios';

import {useEffect,useState} from 'react';
import {
  View, ScrollView, StyleSheet, Image
} from 'react-native';

const HomeScreen = (props) => {
  const [product, setProduct] = useState([]);

  useEffect(()=>{
    axios.get("http://10.0.2.2:8000/v1/book/")
    .then( res =>{
      let value = res.data
       setProduct(value)
    })
  },[])
  console.log("product")
  return (
    <>
      <ScrollView>
        <View style= {styles.container}>
          {
            product.map(product =>(
              <Card key={product._id}>
                <Card.Title style={styles.title}>{product.name}</Card.Title>
                <View style={styles.card}>
                  <View style = {styles.itemLeft}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: product.imgLink}}
                      />
                  </View>
                    <View style={styles.itemRight}>
                      <Text style={styles.name}> Tác giả: {product.author.name}</Text>
                      <Text style={styles.name}> Thể loại: {product.genres}</Text>
                      <Text style={styles.name}> Năm xuất bản: {product.publishedDate}</Text>
                      <Text style= {styles.price}>{(product.price)?.toLocaleString()} VNĐ</Text>
                    </View>
                </View>
              </Card>
            ))}
          {/* <Card>
            <Card.Title>CARD WITH DIVIDER</Card.Title>
            <Card.Divider />
            {users.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  />
                  <Text style={styles.name}>{u.name}</Text>
                </View>
              );
            })}
          </Card> */}
        </View>  
      </ScrollView>   
    
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  card:{
    flex: 2,
    flexDirection:"row",
    justifyContent:'space-between'
  },
  itemLeft : {
    flex: 1
  },
  itemRight : {
    flex: 1
  }
  ,
  title:{
    fontSize: 26,
  }
  ,
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 100,
    height: 150,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  price:{
    fontSize: 22,
    color: "red",
    fontWeight: "600"
  }
  });

export default HomeScreen

