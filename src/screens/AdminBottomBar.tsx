import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './UsersScreen';
import UsersScreen from './UsersScreen';
import QuestionsScreen from './QuestionsScreen';
import ReportScreen from './ReportScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from './Logout';

const Tab = createBottomTabNavigator();

const AdminBottomBar = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => {
            return <Fontisto name={'person'} color={'black'} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Questions"
        component={QuestionsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => {
            return (
              <FontAwesome name={'hourglass-start'} color={'black'} size={20} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => {
            return <Octicons name={'report'} color={'black'} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => {
            return (
              <MaterialCommunityIcons
                name={'login'}
                color={'black'}
                size={20}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomBar;

const styles = StyleSheet.create({});
