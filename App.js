import React, { Component } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, LogBox } from 'react-native'
import { initializeApp } from "firebase/app";
import { useNetInfo } from "@react-native-community/netinfo";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Stack = createStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyAwhCkBTjdCiY-OwDlKxXz84jnKOAn0aFU",
      authDomain: "chatapp-be8a9.firebaseapp.com",
      projectId: "chatapp-be8a9",
      storageBucket: "chatapp-be8a9.appspot.com",
      messagingSenderId: "223689015888",
      appId: "1:223689015888:web:3d397c18f2a7eeb9504755",
      measurementId: "G-VLSBNSB8VB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
        >
          {props => <Messages isConnected={connectionStatus.isConnected} db={db} {...props} />}
          
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
