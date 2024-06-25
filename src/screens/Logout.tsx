import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Logout = ({navigation}) => {
  return (
    <View style={styles.con1}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={styles.con0}>
        <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  con0: {
    alignSelf:'center',
    backgroundColor:'#007BFF',
    borderRadius:15,
    padding:15,
  },
  text:{
    color:'white'
  },
  con1:{
    justifyContent:'center',
    height:'100%'
  }
});
