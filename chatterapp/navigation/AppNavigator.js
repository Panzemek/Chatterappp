import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from './MainTabNavigator';
import RootNavigator from "./RootNavigator";

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  // Auth: AuthNavigator,
  // Root: RootNavigator
}));