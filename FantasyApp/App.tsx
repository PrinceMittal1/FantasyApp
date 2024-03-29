import 'react-native-gesture-handler';
import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./Src/Screens/Home";
import SplashScreen from "./Src/Component/SplashScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import CustomDrawer from "./Src/Component/CustomDrawer";
import ContestCreationScreen from "./Src/Screens/ContestCreationScreen";
import store from './Src/Redux/store';



function App(): React.JSX.Element {

  const Stack = createStackNavigator();


  return (
    <Provider store={store}>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContestCreation"
            component={ContestCreationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
