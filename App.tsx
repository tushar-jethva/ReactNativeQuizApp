// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import BottomBar from './src/screens/AdminBottomBar';
import UsersScreen from './src/screens/UsersScreen';
import AddUser from './src/screens/AddUser';
import {EditUser} from './src/screens/EditUser';
import {useEffect, useState} from 'react';
import {databaseService} from './database/sqlDatabase';
import QuestionsScreen from './src/screens/QuestionsScreen';
import AddQuestions from './src/screens/AddQuestions';
import EditQuestion from './src/screens/EditQuestion';
import AdminBottomBar from './src/screens/AdminBottomBar';
import UserBottomBar from './src/screens/UserBottomBar';
import Logout from './src/screens/Logout';
import UserReportScreen from './src/screens/UserReportScreen';
import UsersReportScreen from './src/screens/UsersReportScreen';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    databaseService.getDBConnection();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomBar"
          component={AdminBottomBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UsersScreen"
          component={UsersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddUserScreen"
          component={AddUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditUser"
          component={EditUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuestionsScreen"
          component={QuestionsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddQuestionsScreen"
          component={AddQuestions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditQuestion"
          component={EditQuestion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserBottomBar"
          component={UserBottomBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UsersReportScreen"
          component={UsersReportScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
