import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import AboutScreen from '../screens/AboutScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CameraScreen from '../screens/CameraScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-medkit'
          : 'md-medkit'
      }
    />
  ),
};

const UsersStack = createStackNavigator({
  Users: UsersScreen,
  Register: RegisterScreen,
  Camera: CameraScreen,
});

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const AboutStack = createStackNavigator({
  About: AboutScreen,
});

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'  ? `ios-information-circle${focused ? '' : '-outline'}`
      : 'md-information-circle'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  UsersStack: UsersStack,
  AboutStack: AboutStack,
});
