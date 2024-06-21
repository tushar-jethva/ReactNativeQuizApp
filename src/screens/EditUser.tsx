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

export const EditUser = ({navigation, route}) => {
  const {user} = route.params;
  const [userInfo, setUserInfo] = useState<User>({
    id: user.id,
    username: user.username != '' ? user.username : '',
    password: user.password != '' ? user.password : '',
    phone_no: user.phone_no != '' ? user.phone_no : '',
    profilePic: user.profilePic != '' ? user.profilePic : '',
    role: user.role != '' ? user.role : '',
  });
  const [errors, setErrors] = useState({
    username: '',
  });

  const openGallery = () => {
    let options: ImageLibraryOptions = {
      includeBase64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setUserInfo({...userInfo, profilePic: response.assets[0].uri});
      }
    });
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (userInfo.username.length < 3 || userInfo.username.length > 20) {
      errors.username = 'Username is may be too long or too short!';
      valid = false;
    }
    if (userInfo.password.length < 5) {
      errors.password = 'Password must be at least 5 characters long!';
      valid = false;
    }
    if (userInfo.phone_no.length !== 10) {
      errors.phoneno = 'Phone number must be exactly 10 numbers!';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const editUser = async () => {
    if (validate()) {
      await databaseService.updateUser(userInfo);
      navigation.goBack();
    }
  };

  const deleteUser = async () => {
    await databaseService.deleteUser(userInfo.id);
    navigation.goBack();
  };
  console.log(userInfo);
  return (
    <View>
      <View style={styles.con0}>
        <View style={styles.con1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={'left'} size={30} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.addUserText}>Edit User</Text>
        </View>
        <TouchableOpacity onPress={deleteUser}>
          <MaterialCommunityIcons
            name={'delete-outline'}
            size={35}
            color={'black'}
            style={styles.delete}
          />
        </TouchableOpacity>
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
        <View style={styles.con4}>
          <TouchableOpacity onPress={openGallery}>
            <AntDesign name={'plus'} size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userInfo.username}
        placeholderTextColor={'grey'}
        onChangeText={value => {
          setUserInfo({...userInfo, username: value});
        }}
      />
      {errors.username && <Text style={styles.errText}>{errors.username}</Text>}
      <TextInput
        style={styles.input}
        placeholder="PhoneNo."
        value={userInfo.phone_no}
        placeholderTextColor={'grey'}
        onChangeText={value => {
          setUserInfo({...userInfo, phone_no: value});
        }}
        keyboardType="numeric"
      />
      {errors.phoneno && <Text style={styles.errText}>{errors.phoneno}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userInfo.password}
        placeholderTextColor={'grey'}
        onChangeText={value => {
          setUserInfo({...userInfo, password: value});
        }}
      />
      {errors.password && <Text style={styles.errText}>{errors.password}</Text>}
      <TouchableOpacity style={styles.loginButton} onPress={editUser}>
        <Text style={styles.loginButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  con2: {
    alignItems: 'center',
    marginTop: '10%',
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
  con0: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delete: {
    marginTop: 16,
    marginRight: 10,
  },
});
