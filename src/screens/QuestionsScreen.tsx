import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Question} from '../models/QuestionModel';
import {useFocusEffect} from '@react-navigation/native';
import {databaseService} from '../../database/sqlDatabase';
import QuestionsListComponent from '../components/QuestionsListComponent';

const QuestionsScreen = ({navigation}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  useFocusEffect(
    useCallback(() => {
      getAllQuestions();
    }, [getAllQuestions]),
  );
  const getAllQuestions = useCallback(async () => {
    const questions = await databaseService.getAllQuestions();
    console.log(questions);
    setQuestions(questions);
  }, []);

  return (
    <View style={styles.con1}>
      <FlatList
        data={questions}
        renderItem={item => {
          return (
            <QuestionsListComponent
              question={item.item}
              navigation={navigation}
            />
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddQuestionsScreen')}
        style={styles.addUserCon}>
        <View>
          <Text style={styles.addUserText}> Add Question </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
  con1: {
    height: '100%',
    marginTop: 15
  },
  addUserText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  addUserCon: {
    width: 150,
    height: 50,
    backgroundColor: '#00B5E2',
    color: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '3%',
  },
});
