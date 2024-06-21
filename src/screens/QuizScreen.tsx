import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {databaseService} from '../../database/sqlDatabase';
import {Question} from '../models/QuestionModel';

const QuizScreen = ({user}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [isQuizEnd, setQuizEnd] = useState(false);
  const [currentOption, setCurrentOption] = useState(-1);
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const getAllQuestions = async () => {
    const questionss = await databaseService.getAllQuestions();
    setQuestions(questionss);
  };

  const changeQuestionIndex = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setCurrentOption(-1);
      setIsTrue(false);
    } else {
      setQuizEnd(true);
    }
  };

  const setOption = (option: Number) => {
    setCurrentOption(option);
    if (option.toString() == currentQuestion.correctAnswer) {
      setIsTrue(true);
      console.log(isTrue);
    }
  };

  const setQuiz = () => {
    setQuestionIndex(0);
    setQuizEnd(false);
    setIsTrue(false);
    setCurrentOption(-1);
    const attempt = {
      id: 0,
      userId: user.id,
      questionId: currentQuestion.id,
      chosenOption: currentOption,
      isTrue: isTrue ? true : false,
    };
    databaseService.deleteAttempt(attempt);
  };

  const saveAnswer = async () => {
    const attempt = {
      id: 0,
      userId: user.id,
      questionId: currentQuestion.id,
      chosenOption: currentOption,
      isTrue: isTrue ? true : false,
    };
    await databaseService.createAttempt(attempt);
    if (currentQuestionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setCurrentOption(-1);
      setIsTrue(false);
    } else {
      setQuizEnd(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return questions.length > 0 && !isQuizEnd ? (
    <View>
      <View style={styles.con2}>
        <Text style={styles.question}>Q. {currentQuestion['question']}</Text>
      </View>
      {[1, 2, 3, 4].map(i => (
        <TouchableOpacity
          key={i}
          onPress={() => setOption(i)}
          disabled={currentOption != -1}>
          {isTrue && i == currentOption ? (
            <>
              <View style={styles.con3G}>
                <Text style={styles.options}>{currentQuestion[`opt${i}`]}</Text>
              </View>
            </>
          ) : !isTrue && i == currentOption ? (
            <>
              <View style={styles.con3R}>
                <Text style={styles.options}>{currentQuestion[`opt${i}`]}</Text>
              </View>
            </>
          ) : (
            <View style={styles.con3}>
              <Text style={styles.options}>{currentQuestion[`opt${i}`]}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={styles.con4}>
        <TouchableOpacity onPress={changeQuestionIndex}>
          <View style={styles.con5}>
            <Text style={styles.btnTextNext}>Next</Text>
          </View>
        </TouchableOpacity>
        {currentOption != -1 ? (
          <TouchableOpacity onPress={saveAnswer}>
            <View style={styles.con6}>
              <Text style={styles.btnTextSubmit}>Submit</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  ) : isQuizEnd ? (
    <View
      style={{justifyContent: 'center', alignSelf: 'center', height: '100%'}}>
      <Text style={{color: 'black', fontSize: 20}}>Quiz ended!</Text>
      <TouchableOpacity onPress={setQuiz}>
        <View style={styles.con5}>
          <Text style={styles.btnTextNext}>Restart</Text>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={{justifyContent: 'center', alignSelf: 'center', height: '100%'}}>
      <Text style={{color: 'black', fontSize: 20}}>Test will start soon!</Text>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  con2: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 'auto',
    width: '90%',
    marginTop: '20%',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
  },
  con3: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 'auto',
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 25,
  },
  con3G: {
    backgroundColor: '#E6FFE6',
    borderRadius: 15,
    height: 'auto',
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 25,
  },
  con3R: {
    backgroundColor: 'red',
    borderRadius: 15,
    height: 'auto',
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 25,
  },
  options: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 14,
  },
  optionsG: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 14,
  },
  con4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  con5: {
    backgroundColor: '#0E86D4',
    padding: 20,
    borderRadius: 15,
    justifyContent: 'center',
  },
  btnTextNext: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
  },
  con6: {
    backgroundColor: '#90EE90',
    padding: 20,
    borderRadius: 15,
  },
  btnTextSubmit: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
