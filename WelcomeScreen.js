import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

//In the welcome screen, we are implementing both the login and the registration
//views in one file, since they are so similar
const WelcomeScreen = ({ onGO }) => {
  //hold the values of user entered info for login
  const [logUsername, setLogUsername] = useState('');
  const [logPassword, setLogPassword] = useState('');
  //hold the values of user entered info for registration
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  //holds the value of the current screen, used for navigation
  //base value set to login, meaning initial screen is login
  const [screen, setScreen] = useState('Login');
  //function called when the user submits there entries in the login view
  const handleLogin = async () => {
    try {
      //Connecting to the database with the rest API endpoint of user login with accurate method
      const response = await fetch("http://172.21.196.65/index.php/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //contains the user inputted login info
        body: JSON.stringify({
          log_username: logUsername,
          log_password: logPassword,
        }),
      });
      //checking to make sure the fetch was successful
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          console.log('User logged in successfully', data.username);
          //onGO is used in app.js to store the logged in username
          onGO({ username: data.username });
        } else { console.error('Error logging in', data.error); }
      } else { console.error('Error logging in:', response.status, response.statusText); }
    } catch (error) { console.error('Error during request:', error); }
  };
  //function called when the user submits entries in registration view
  const handleRegister = async () => {
    try {
      //again connecting to database, however with create endpoint now and appropriate method
      const response = await fetch("http://172.21.196.65/index.php/user/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //contains user entered info for the registration fields
        body: JSON.stringify({
          reg_username: regUsername,
          reg_password: regPassword,
          c_password: cPassword,
        }),
      });
      //checking to make sure fetch was successful
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          console.log('User logged in successfully', data.username);
          //again, onGO used to send the entered username to app.js
          onGO({ username: data.username });
        } else { console.error('Error logging in', data.error); }
      } else { console.error('Error logging in:', response.status, response.statusText); }
    } catch (error) { console.error('Error during request:', error); }
  };
  //navigation system used throughout app, constantly using States
  //and setting new screens when users click buttons in selected views
  const navigateToScreen = (screen) => {
    setScreen(screen);
  };
  //here, we have the two views; login and registration... as seen, 
  //there are buttons to the other with the navigation function
  //used onPress to reset the screen State.
  //Also within each view is text inputs to accept user info
  return (
    <View>
      {screen === 'Login' && (
        <View>
          <Button title="Register here" onPress={() => navigateToScreen('Registration')} />
          <Text>LOGIN</Text>
          <TextInput placeholder="Enter your username" value={logUsername} onChangeText={setLogUsername} />
          <TextInput
            placeholder="Enter your password" secureTextEntry value={logPassword} onChangeText={setLogPassword} />
          <Button title="LOGIN" onPress={handleLogin} />
        </View>
      )}
      {screen === 'Registration' && (
        <View>
          <Button title="Login here" onPress={() => navigateToScreen('Login')} />
          <Text>Registration</Text>
          <TextInput placeholder="Enter your username" value={regUsername} onChangeText={setRegUsername} />
          <TextInput placeholder="Enter your password" secureTextEntry value={regPassword} onChangeText={setRegPassword} />
          <TextInput placeholder="Confirm your password" secureTextEntry value={cPassword} onChangeText={setCPassword} />
          <Button title="REGISTER" onPress={handleRegister} />
        </View>
      )}
    </View>
  );
};

export default WelcomeScreen;