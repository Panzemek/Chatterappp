import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from "../screens/AuthLoadingScreen"
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/Signup';
import Welcome from "../screens/Welcome";

const AuthStackNavigator = createStackNavigator({
  Welcome: Welcome,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
})

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: MainTabNavigator,
  // Auth: AuthStack,
  // Root: RootNavigator
}));