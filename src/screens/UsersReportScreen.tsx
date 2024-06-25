import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {databaseService} from '../../database/sqlDatabase';
import {Attempt} from '../models/AttempModels';
import {Question} from '../models/QuestionModel';
import {useFocusEffect} from '@react-navigation/native';

const UsersReportScreen = ({route}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Attempt[]>([]);
  const {user} = route.params;
  useFocusEffect(
    useCallback(() => {
      getAllQuestions();
      console.log('hello world');
    }, [getAllQuestions]),
  );

  const getAllQuestions = useCallback(async () => {
    const questionss = await databaseService.getAllQuestions();
    const getAnswers = await databaseService.getAttemptById(user.id);
    setQuestions(questionss);
    setAnswers(getAnswers);
  }, []);

  const renderItem = ({item: question}) => {
    let backgroundColor = 'white';
    console.log(question.id);
    const attempt = answers.find(answer => {
      console.log('Hello');
      console.log(answer.questionId);
      if (answer.questionId === question.id) {
        if (answer.isTrue) {
          backgroundColor = 'green';
        } else {
          backgroundColor = 'red';
        }
      }
    });

    console.log(backgroundColor);

    return (
      <View style={[styles.questionContainer, {backgroundColor}]}>
        <Text style={styles.questionText}>Q. {question.question}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UsersReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  questionContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  questionText: {
    color: 'black',
  },
});
