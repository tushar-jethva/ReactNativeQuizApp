import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {databaseService} from '../../database/sqlDatabase';
import {User} from '../models/UserModel';
import UserListComponent from '../components/UserListComponent';
import {useFocusEffect} from '@react-navigation/native';
import AllUserReports from './AllUserReports';

const ReportScreen = ({navigation}) => {
  const [users, setUsers] = useState<User[]>([]);
  useFocusEffect(
    useCallback(() => {
      getAllUsers();
      console.log('hello world');
    }, [getAllUsers]),
  );
  const getAllUsers = useCallback(async () => {
    const user = await databaseService.getAllUsers();
    console.log(user);
    setUsers(user);
  }, []);
  return (
    <View style={styles.con1}>
      <FlatList
        data={users}
        renderItem={item => {
          return <AllUserReports user={item.item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  con1: {
    marginTop: 20,
  },
  addUserCon: {
    width: 100,
    height: 50,
    backgroundColor: '#00B5E2',
    color: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: '3%',
    right: '3%',
  },
  addUserText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
