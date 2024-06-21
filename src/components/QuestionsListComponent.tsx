import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const QuestionsListComponent = ({question, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditQuestion', {question: question})}>
      <View style={styles.con0}>
        <Text style={styles.question}>Q. {question.question}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuestionsListComponent;

const styles = StyleSheet.create({
  con0: {
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 20,
  },
  question: {
    margin: 15,
    color: 'black',
    fontSize: 17,
  },
});
