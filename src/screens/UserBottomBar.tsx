import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './UsersScreen';
import UsersScreen from './UsersScreen';
import QuestionsScreen from './QuestionsScreen';
import ReportScreen from './ReportScreen';
import UserProfile from './UserProfile';
import QuizScreen from './QuizScreen';
import UserReportScreen from './UserReportScreen';

const Tab = createBottomTabNavigator();

const UserBottomBar = ({route}) => {
  const {user} = route.params;
  return (
    <Tab.Navigator screenOptions={{headerShown: false,}}>
      <Tab.Screen
        name="Profile"
        children={() => <UserProfile user={user}/>}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Start"
        children={() => <QuizScreen user={user}/>}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UserReport"
        children={() => <UserReportScreen user={user}/>}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default UserBottomBar;

const styles = StyleSheet.create({});
