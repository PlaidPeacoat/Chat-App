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

  const App = () => {
    
    const connectionStatus = useNetInfo();

    useEffect(() => {
        //check if connected to the internet, if not give an error message
      if (connectionStatus.isConnected === false) {
        Alert.alert("Connection Lost");
        disableNetwork(db); //disable connection to firestore if not connected to the internet
      } else if (connectionStatus.isConnected === true) {
        enableNetwork(db); //enable connection to firestore if connected to the internet
      }  
    }, [connectionStatus.isConnected]);

    return ( //'return' is what is going to be shown on the screen
      <NavigationContainer> //creates navigations container to show different screens and navigate between them
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name = "Start" component = {Start} />
          <Stack.Screen name = "Chat">
            {(props) => (
              <Chat is Connected={connectionStatus.isConnected} db={db} {...props} /> 
              //passes the connection status, database, and props to the chat component, so that when we use chat, it stores on firebase
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  
  export default App;