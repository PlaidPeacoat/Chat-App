import { Alert, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

// Firebase configuration object with API keys and project information
const firebaseConfig = {
  apiKey: "AIzaSyAwhCkBTjdCiY-OwDlKxXz84jnKOAn0aFU",
  authDomain: "chatapp-be8a9.firebaseapp.com",
  projectId: "chatapp-be8a9",
  storageBucket: "chatapp-be8a9.appspot.com",
  messagingSenderId: "223689015888",
  appId: "1:223689015888:web:3d397c18f2a7eeb9504755",
  measurementId: "G-VLSBNSB8VB",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const App = () => {
  // Get the network connection status using useNetInfo hook
  const connectionStatus = useNetInfo();

  useEffect(() => {
    // Check the connection status and perform actions accordingly
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db); // Disable Firestore network access
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db); // Enable Firestore network access
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
