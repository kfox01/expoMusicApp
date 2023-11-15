//necessary react and react native imports from corresponding libraries
import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text } from 'react-native';
//importing children views that are required for navigation from home
import ListScreen from './ListScreen';
import AddScreen from './AddScreen';
import WelcomeScreen from './WelcomeScreen';
import TopScreen from './NewFeatureScreen';

const App = () => {
  //screen used for navigation, always dictating which view the user is being shown
  //set to Welcome at the start because the user must first login/register to begin
  const [screen, setScreen] = useState('Welcome');
  //keeps track of the logged in user to be given for adding songs, updating, etc.
  const [loggedInUsername, setLoggedInUsername] = useState('');
  //navigation system used throughout app, constantly using States
  //and setting new screens when users click buttons in selected views
  const navigateToScreen = (screen) => {
    setScreen(screen);
  };
  //view containing the multiple children views of welcome (initial)
  //listScreen contains the song list, and a button to addSong
  //addScreen allows the user to add a new song, and redirects to AddScreen
  return (
    <SafeAreaView>
      <View>
        {screen === 'Welcome' && (
          <View>
            <WelcomeScreen onGO={(user) => { setLoggedInUsername(user.username); navigateToScreen('Home'); }} />
          </View>
        )}
        {screen === 'Home' && (
          <View>
            <Text>This is the Home Screen</Text>
            <Button title="TO SONGLIST" onPress={() => navigateToScreen('List')} />
            <Button title="TO TOP RANKINGS" onPress={() => navigateToScreen('Top')} />
          </View>
        )}
        {screen === 'List' && (
          <View>
            <Text>Welcome, {loggedInUsername}!</Text>
            <Button title="BACK TO HOME" onPress={() => navigateToScreen('Home')} />
            <Button title="ADD SONG" onPress={() => navigateToScreen('Add')} />
            <ListScreen loggedInUsername={loggedInUsername} />
          </View>)}
          {screen === 'Top' && (
          <View>
            <Text>Welcome, {loggedInUsername}!</Text>
            <Button title="BACK TO HOME" onPress={() => navigateToScreen('Home')} />
            <TopScreen/>
          </View>)}

        {screen === 'Add' && (
          <View>
            <Button title="BACK TO SONGLIST" onPress={() => navigateToScreen('List')} />
            <AddScreen loggedInUsername={loggedInUsername} />
          </View>)}
      </View>
    </SafeAreaView>
  );
};

export default App;