//imports for react and react-native features used
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Button, ScrollView } from 'react-native';

const TopScreen = () => {
  //used to check if the data is being accessed
  const [isLoading, setLoading] = useState(true);
  //holds the list of songs that is retrieved from the ratings table if the fetch is successful
  const [songs, setSongs] = useState([]);

  const fetchSongs = () => {
    fetch("http://172.21.196.65/index.php/song/list", {
      method: "GET", // You are making a GET request
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      //setting the response value
      .then((response) => response.json())
      //setting the songs to the list retrieved in the response
      .then((json) => setSongs(json.songs))
      //checking to make sure nothing went wrong in the fetch
      .catch((error) => console.error("Error fetching data:", error))
      //turns off the loading state and sends the user to the list screen
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    fetchSongs(); }, []);

  //method of displaying songs within the FlatList in the list view, broken down into its components;
  //user, title, artist, rating, and then buttons to update the song and delete song, which should
  //only be prompted when the loggedInUsername matches the item.user from the song
  const renderItem = ({ item }) => {
    // Only render the item if its rating is 5
    if (item.rating == 5) {
      return (
        <View style={{ marginBottom: 10 }}>
          <Text>User: {item.user}</Text>
          <Text>Title: {item.title}</Text>
          <Text>Artist: {item.artist}</Text>
          <Text>Rating: {item.rating}</Text>
        </View>
      );
    }
    else {return null;}
  };

  //view with conditional navigation to move between song list, update and delete song
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        {isLoading ? (<Text>Loading...</Text>) : (
          <View>
              <FlatList data={songs} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TopScreen;
