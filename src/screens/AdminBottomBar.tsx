import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './UsersScreen';
import UsersScreen from './UsersScreen';
import QuestionsScreen from './QuestionsScreen';
import ReportScreen from './ReportScreen';

const Tab = createBottomTabNavigator();

const AdminBottomBar = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Questions"
        component={QuestionsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Logout"
        component={ReportScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomBar;

const styles = StyleSheet.create({});
