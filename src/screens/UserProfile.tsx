import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  launchImageLibrary,
  launchCamera,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {User} from '../models/UserModel';
import {databaseService} from '../../database/sqlDatabase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfile = ({user}) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: user.id,
    username: user.username,
    password: user.password,
    phone_no: user.phone_no,
    profilePic: user.profilePic,
    role: user.role,
  });


  return (
    <View>
      <View style={styles.con0}>
        <Text style={styles.title}>Namaste {userInfo.username}</Text>
      </View>
      <View style={styles.con2}>
        <View style={styles.con3}>
          <Image
            source={
              userInfo.profilePic == ''
                ? require('../../assets/smile.png')
                : {uri: userInfo.profilePic}
            }
            style={styles.imageUser}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>Username: {userInfo.username}</Text>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>PhoneNo: {userInfo.phone_no}</Text>
      </View>
      <View style={styles.input}>
        <Text style={styles.text}>Password: {userInfo.password}</Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  con0: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logOut: {
    margin: 15,
  },
  con2: {
    alignItems: 'center',
    marginTop: '25%',
    marginBottom: '10%',
  },
  con3: {
    position: 'relative',
    height: 150,
    width: 150,
  },
  imageUser: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    objectFit: 'cover',
  },
  con4: {
    position: 'absolute',
    right: '35%',
    top: '80%',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: 'black',
    marginBottom: 10,
    justifyContent: 'center',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007BFF',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  con1: {
    margin: 20,
    flexDirection: 'row',
  },
  addUserText: {
    fontSize: 20,
    color: 'black',
    marginLeft: 15,
  },
  errText: {
    color: 'red',
    marginBottom: 20,
    marginLeft: 25,
  },
  text: {
    color: 'black',
  },
  title: {
    color: 'black',
    fontSize: 20,
    margin: 15,
  },
});
