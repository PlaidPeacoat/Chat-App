import React, { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import "react-native-gesture-handler";
import firebase from "firebase";
require("firebase/firestore");

// Create navigation stack

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const Stack = createNativeStackNavigator();

const App = () => {
  const db = firebase.firestore();
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      db.disableNetwork();
    } else if (connectionStatus.isConnected === true) {
      db.enableNetwork();
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }} // Hide header
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          //Title of header
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;