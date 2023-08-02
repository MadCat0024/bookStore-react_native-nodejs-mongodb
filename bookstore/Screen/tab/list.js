import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import filter from 'lodash.filter';
import { nfc } from 'unorm'; // fix vietnamese

const url = `http://10.0.2.2:8000/v1/book/`;

const List = () => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData(url);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      let value = response.data;
      setData(value);
      setFullData(value);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError(e);
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setVisible(false);
    if (genre === 'All') {
      setData(fullData);
    } else {
      const filteredData = fullData.filter((book) => book.genres.includes(genre));
      setData(filteredData);
    }
  };

  const genres = ['All', 'Truyện ngắn', 'Tiểu thuyết'];

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error is fetching data....check your internet</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Filter by Genre:</Text>
            <Text onPress={() => setVisible(true)}>{selectedGenre}</Text>
          </View>
        }
      >
        {genres.map((genre) => (
          <Menu.Item key={genre} onPress={() => handleGenreSelect(genre)} title={genre} />
        ))}
      </Menu>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.img} source={{ uri: item.imgLink }} />
            <View>
              <Text>{item.genres}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} VNĐ</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  img: {
    width: 50,
    height: 75,
    borderRadius: 3,
  },
  price: {
    color: 'red',
    fontWeight: '600',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    marginRight: 10,
  },
});

export default List;
