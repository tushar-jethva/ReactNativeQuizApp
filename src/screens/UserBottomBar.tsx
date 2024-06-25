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
import Logout from './Logout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const UserBottomBar = ({route}) => {
  const {user} = route.params;
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Profile"
        children={() => <UserProfile user={user} />}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => {
            return <Fontisto name={'person'} color={'black'} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Start"
        children={() => <QuizScreen user={user} />}
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
        name="UserReport"
        children={() => <UserReportScreen user={user} />}
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

export default UserBottomBar;

const styles = StyleSheet.create({});
