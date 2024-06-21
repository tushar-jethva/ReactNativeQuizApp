import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {User} from '../models/UserModel';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserListComponent: React.FC<User> = ({user, navigation}) => {
  const goToEditScreen = () => {
    navigation.navigate('EditUser', {user: user});
  };
  return (
    <TouchableOpacity onPress={goToEditScreen}>
      <View style={styles.con0}>
        <View style={styles.con1}>
          <View style={styles.con2}>
            <Image
              style={styles.profilePic}
              source={
                user.profilePic == ''
                  ? require('../../assets/smile.png')
                  : {uri: user.profilePic}
              }
            />
          </View>
          <View style={styles.con4}>
            <View style={styles.con3}>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.phoneNo}>{user.phone_no}</Text>
            </View>
            <AntDesign
              name="right"
              size={23}
              color={'black'}
              style={styles.iconRight}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserListComponent;

const styles = StyleSheet.create({
  con0: {
    height: 110,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 20,
  },
  con1: {
    flexDirection: 'row',
  },
  con2: {
    height: 80,
    width: 80,
  },
  profilePic: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    marginLeft: 15,
  },
  userName: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
    marginTop: 10,
  },
  phoneNo: {
    color: 'grey',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 3,
  },
  con3: {
    marginLeft: 30,
    width: 'auto',
  },
  con4: {
    width: '74%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRight: {
    alignSelf: 'center',
  },
});
