import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {databaseService} from '../../database/sqlDatabase';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToHome = async () => {
    if (email == '') {
      ToastAndroid.show('Please enter valid email!', 1000);
    } else if (password == '') {
      ToastAndroid.show('Please enter valid password!', 1000);
    } else {
      const user = await databaseService.getUser(email, password);
      if (user != null) {
        if (user.role == 'user') {
          navigation.navigate('UserBottomBar', {
            user: user,
            navigation: navigation,
          });
        } else {
          navigation.navigate('BottomBar', {user: user});
        }
      } else {
        ToastAndroid.show('Username or password may wrong!', 1000);
      }
    }
  };

  return (
    <View>
      <Image style={styles.logo} source={require('../../assets/smile.png')} />
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor={'grey'}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        placeholderTextColor={'grey'}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={goToHome}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    height: 130,
    objectFit: 'contain',
    marginTop: 45,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    alignSelf: 'center',
    color: 'black',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginBottom: 10,
    color: 'black',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007BFF',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
});
