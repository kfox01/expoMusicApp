//imports for react and react-native features used
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, Button, ScrollView } from 'react-native';
import UpdateScreen from './UpdateScreen'

const ListScreen = () => {
  //used to check if the data is being accessed
  const [isLoading, setLoading] = useState(true);
  //holds the list of songs that is retrieved from the ratings table if the fetch is successful
  const [songs, setSongs] = useState([]);
  //used to set the current screen depending on whether the user is trying to view list, update or delete song
  const [screen, setScreen] = useState('List');
  //meant to hold the info for the song that the user is intending to edit
  const [updateSong, setUpdateSong] = useState(null);
  //holds the info for the song the user is trying to delete, most importantly, song id
  const [deleteSong, setDeleteSong] = useState(null);
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
  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text>User: {item.user}</Text>
      <Text>Title: {item.title}</Text>
      <Text>Artist: {item.artist}</Text>
      <Text>Rating: {item.rating}</Text>
      <Button title="Update" onPress={() => handleUpdate(item)} />
      <Button title="Delete" onPress={() => handleDelete(item)} />
    </View>
  );
  //used to switch to the update song view, sets updateSong to the song at which it was chosen,
  //giving it all relevant data to be editted
  const handleUpdate = (item) => {
    setScreen('Update');
    setUpdateSong(item);
    console.log('Update button clicked for:', item);
  };
  //used to switch to the delete song view, sets the ID of the song to the DeleteSong, which will be sent with the deleteview
  const handleDelete = (itemId) => {
    setScreen('Delete');
    setDeleteSong(itemId);
    console.log('Delete button clicked for item ID:', itemId);
  };

   const navigateToScreen = (screen) => {
    setScreen(screen);
  }; 

  //view with conditional navigation to move between song list, update and delete song
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        {isLoading ? (<Text>Loading...</Text>) : (
          <View>
            {screen === 'List' && (
              <FlatList data={songs} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
            )}
            {screen === 'Update' && (
              <View>
                <Button title="TO SONGLIST" onPress={() => navigateToScreen('List')} />
                <UpdateScreen song={updateSong} onSongUpdated={fetchSongs} />
              </View>
            )}
            {screen === 'Delete' && (
              <Text>Delete</Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;
