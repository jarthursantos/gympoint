import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import logo from '~/assets/logo-horizontal.png';
import Checkins from '~/pages/Main/Checkins';
import HelpOrderDetails from '~/pages/Main/HelpOrderDetails';
import HelpOrders from '~/pages/Main/HelpOrders';
import NewHelpOrder from '~/pages/Main/NewHelpOrder';
import SignIn from '~/pages/SignIn';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        Main: createStackNavigator(
          {
            Tabs: createBottomTabNavigator(
              {
                Checkins,
                HelpOrders,
              },
              {
                // resetOnBlur: true,
                tabBarOptions: {
                  activeTintColor: '#EE4E62',
                  inactiveTintColor: '#999',
                  keyboardHidesTabBar: true,
                  safeAreaInset: {
                    top: 4,
                    bottom: 8,
                  },
                  style: {
                    backgroundColor: '#FFF',
                    borderTopColor: '#ddd',
                  },
                },
              },
            ),
            NewHelpOrder,
            HelpOrderDetails,
          },
          {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
              headerTitle: <Image source={logo} />,
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'Main' : 'SignIn',
      },
    ),
  );
