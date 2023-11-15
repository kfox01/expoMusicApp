//importing necessary features from react and react native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
//AddScreen takes in loggedInUsername from app.js to be used when adding song
const AddScreen = ({ loggedInUsername }) => {
  //keeping track of the user inputted entries for required fields
  //of the addSong backend; title, artist, rating
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newRating, setNewRating] = useState('');

  //called on submit of the text inputs view for add song
  const handleAddSong = async () => {
    //checking to make sure no text fields are left blank
    if (!newTitle || !newArtist || !newRating) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    try {
      //accessing the database with the endpoint song/create
      //giving appropriate POST method
      const response = await fetch("http://172.21.196.65/index.php/song/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //giving the appropriate entries to the createAction in backend
        //loggedInUsername used here coming from the app.js, rest of entries
        //come from the text inputs in view below
        body: JSON.stringify({
          user: loggedInUsername,
          title: newTitle,
          artist: newArtist,
          rating: newRating,
        }),
      });
      //checking to make sure fetch went successfully, and song is added
      if (response.ok) {
        // Successfully added the song
        Alert.alert('Success', 'Song added successfully');
        //Clearing the entries for next use, just in case something was stored
        setNewTitle('');
        setNewArtist('');
        setNewRating('');
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
      <Text> User : {loggedInUsername}</Text>
      <Text>Title:</Text>
      <TextInput onChangeText={setNewTitle} value={newTitle} placeholder="enter title" />
      <Text>Artist:</Text>
      <TextInput onChangeText={setNewArtist} value={newArtist} placeholder="enter artist" />
      <Text>Rating:</Text>
      <TextInput onChangeText={setNewRating} value={newRating} placeholder="enter rating" keyboardType="numeric" />
      <Button title="Add Song" onPress={handleAddSong} />
    </View>
  );
};

export default AddScreen;
