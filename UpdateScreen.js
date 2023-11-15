//importing necessary features from react and react native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
//UpdateScreen takes in loggedInUsername from app.js to be used when adding song
const UpdateScreen = ({ song, onSongUpdated }) => {
  //keeping track of the user inputted entries for required fields
  //of the addSong backend; title, artist, rating
  const [newTitle, setNewTitle] = useState(song.title);
  const [newArtist, setNewArtist] = useState(song.artist);
  const [newRating, setNewRating] = useState(song.rating);
  
  const handleUpdateSong = async () => {
    try {
      //accessing the database with the endpoint song/create
      //giving appropriate POST method
      const response = await fetch("http://172.21.196.65/index.php/song/edit", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        //giving the appropriate entries to the createAction in backend
        //loggedInUsername used here coming from the app.js, rest of entries
        //come from the text inputs in view below
        body: JSON.stringify({
          id: song.id,
          title: newTitle,
          artist: newArtist,
          rating: newRating,
        }),
      });
      //checking to make sure fetch went successfully, and song is added
      if (response.ok) {
        // Successfully added the song
        Alert.alert('Success', 'Song added successfully');
        onSongUpdated();
      } else {
        //checking errors
        const errorData = await response.json();
        Alert.alert('Error', `Failed to add song: ${errorData.message}`);
      }
    } catch (error) {
      //checking errors
      console.error('Error adding song:', error);
      Alert.alert('Error', 'Failed to add song. Please try again.');
    }
  };
  //Simply contains the text inputs for the user to add, then 
  //on submit these entries are sent along with user to be added
  //to the ratings table of our database
  return (
    <View>
      <Text> User : {song.user}</Text>
      <Text>Title:</Text>
      <TextInput onChangeText={setNewTitle} value={newTitle} placeholder={newTitle} />
      <Text>Artist:</Text>
      <TextInput onChangeText={setNewArtist} value={newArtist} placeholder={newArtist} />
      <Text>Rating:</Text>
      <TextInput onChangeText={setNewRating} value={newRating} placeholder={newRating} keyboardType="numeric" />
      <Button title="Update Song" onPress={handleUpdateSong} />
    </View>
  );
};

export default UpdateScreen;