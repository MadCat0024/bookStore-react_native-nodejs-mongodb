import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import filter from 'lodash.filter';
import { nfc } from 'unorm'; // fix vietnamese

const url = `http://10.0.2.2:8000/v1/book/`;

const Author = () => {
  const [text, setText] = useState([]);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = normalizeString(query.toLowerCase()); // Normalize the search query
    const filteredData = filter(fullData, (book) => {
      return contains(book, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ name}, query) => {
    const formattedName = normalizeString(name.toLowerCase()); // Normalize the book name
    if (formattedName.includes(query)) {
      return true;
    }
    return false;
  };

  const normalizeString = (str) => {
    return nfc(str); // Normalize the string using Unicode Normalization Form C (NFC)
  };

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
      <TextInput label="Search" value={searchQuery} onChangeText={(query) => handleSearch(query)} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.img} source={{ uri: item.imgLink }} />
            <View>
              <Text>{item.name}</Text>
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
});

export default Author;
