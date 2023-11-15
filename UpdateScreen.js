//importing necessary features from react and react native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
//UpdateScreen takes in loggedInUsername from app.js to be used when adding song
const UpdateScreen = ({ song, onSongUpdated }) => {
  //keeping track of the user inputted entries for required fields
  //of the updateSong backend; title, artist, rating
  const [newTitle, setNewTitle] = useState(song.title);
  const [newArtist, setNewArtist] = useState(song.artist);
  const [newRating, setNewRating] = useState(song.rating);
  
  const handleUpdateSong = async () => {
    try {
      //accessing the database with the endpoint song/edit
      //giving appropriate PUT method
      const response = await fetch("http://172.21.196.65/index.php/song/edit", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        //giving the appropriate entries to the createAction in backend
        //id given so the backend knows which song to edit
        body: JSON.stringify({
          id: song.id,
          title: newTitle,
          artist: newArtist,
          rating: newRating,
        }),
      });
      //checking to make sure fetch went successfully, and song is updated
      if (response.ok) {
        // Successfully updated the song
        Alert.alert('Success', 'Song updated successfully');
        onSongUpdated();
      } else {
        //checking errors
        const errorData = await response.json();
        Alert.alert('Error', `Failed to update song: ${errorData.message}`);
      }
    } catch (error) {
      //checking errors
      console.error('Error updating song:', error);
      Alert.alert('Error', 'Failed to update song. Please try again.');
    }
  };
  //Simply contains the text inputs for the user to update, then 
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