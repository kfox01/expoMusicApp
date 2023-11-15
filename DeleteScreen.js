import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const DeleteScreen = ({ song, onDeleteSuccess, onDeleteCancel }) => {
  const handleDelete = async () => {
    // Confirm deletion with the user
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${song.title}" by ${song.artist}?`,
      [
        // User presses 'Cancel' - do nothing
        { text: "Cancel", onPress: () => onDeleteCancel(), style: "cancel" },
        // User presses 'OK' - proceed with deletion
        { text: "OK", onPress: () => deleteSong() },
      ],
      { cancelable: false }
    );
  };

  const deleteSong = async () => {
    try {
      const response = await fetch(`http://172.21.196.65/index.php/song/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: song.id, // Assuming the song object has an 'id' field
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Song deleted successfully');
        onDeleteSuccess();
      } else {
        Alert.alert('Error', 'Failed to delete the song');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View>
      <Text>Delete Song</Text>
      <Text>{`Are you sure you want to delete "${song.title}" by ${song.artist}?`}</Text>
      <Button title="Delete Song" onPress={handleDelete} />
    </View>
  );
};

export default DeleteScreen;
