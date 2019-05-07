import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from "../screens/AuthLoadingScreen"
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/Signup';
import Welcome from "../screens/Welcome";
import HomeScreen from '../screens/HomeScreen';
import NewRoom from "../components/NewRoom/NewRoom";
import NewChatScreen from "../screens/NewChatScreen";
import ChatroomScreen from "../screens/ChatroomScreen"
import LinksScreen from "../screens/LinksScreen"


const AuthStackNavigator = createStackNavigator({
  Welcome: Welcome,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
})

const NewRoomNavigator = createStackNavigator({
  Home: HomeScreen,
  Room: NewChatScreen,
})

const RoomNav = createStackNavigator({
  MsgRoom: ChatroomScreen,
  Origin: LinksScreen,
})

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: MainTabNavigator,
  Rooms: NewRoomNavigator,
  RoomNav: RoomNav,
}));