import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text } from 'react-native';
import ListScreen from './ListScreen';
import AddScreen from './AddScreen';
import WelcomeScreen from './WelcomeScreen';

const App = () => {
  //need to make base state the login state so that the user is automatically prompted to login
  const [screen, setScreen] = useState('Welcome');
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const navigateToScreen = (screen) => {
    setScreen(screen);
  };

  return (
    <SafeAreaView>
      <View>
        {screen === 'Welcome' && (
          <View>
            <WelcomeScreen
              onGO={(user) => {
                setLoggedInUsername(user.username);
                navigateToScreen('List');
              }}
            />
            <Button title="TO HOME" onPress={() => navigateToScreen('Home')} />
            {/*navigation method to change the screen to the song list*/}
            <Button title="TO SONGLIST" onPress={() => navigateToScreen('List')} />
          </View>
        )}
        {screen === 'Home' && (
          <View>
            <Text>This is the Home Screen</Text>
            <Button title="TO DETAILS" onPress={() => navigateToScreen('Details')} />
            <Button title="TO SONGLIST" onPress={() => navigateToScreen('List')} />
          </View>
        )}
        {screen === 'Details' && (
          <View>
            <Text>This is the Details Screen</Text>
            <Button title="BACK TO HOME" onPress={() => navigateToScreen('Home')} />
          </View>
        )}
        {screen === 'List' && (
          <View>
            <Text>Welcome, {loggedInUsername}!</Text>
            <Button title="ADD SONG" onPress={() => navigateToScreen('Add')} />
            <ListScreen loggedInUsername={loggedInUsername} />

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
