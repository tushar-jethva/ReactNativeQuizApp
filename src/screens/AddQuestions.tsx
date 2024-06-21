import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Question} from '../models/QuestionModel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import {databaseService} from '../../database/sqlDatabase';

const AddQuestions = ({navigation}) => {
  const [questionInfo, setQuestionInfo] = useState<Question>({
    id: 0,
    question: '',
    opt1: '',
    opt2: '',
    opt3: '',
    opt4: '',
    correctAnswer: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (questionInfo.question == '') {
      errors.question = 'Question should be entered!';
      valid = false;
    }
    if (questionInfo.opt1 == '') {
      errors.opt1 = 'Option must be entered!';
      valid = false;
    }
    if (questionInfo.opt2 == '') {
      errors.opt2 = 'Option must be entered!';
      valid = false;
    }
    if (questionInfo.opt3 == '') {
      errors.opt3 = 'Option must be entered!';
      valid = false;
    }
    if (questionInfo.opt4 == '') {
      errors.opt4 = 'Option must be entered!';
      valid = false;
    }
    if (questionInfo.correctAnswer == 'Select Correct Answer') {
      errors.correctAns = 'Correct answer must be choosed!';
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const saveQuestion = async () => {
    if (validate()) {
      await databaseService.createQuestion(questionInfo);
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.con1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={'left'} size={30} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.addUserText}>Add Question</Text>
        </View>
        <TextInput
          style={styles.inputQ}
          placeholder="Question"
          value={questionInfo.question}
          placeholderTextColor={'grey'}
          onChangeText={value => {
            setQuestionInfo({...questionInfo, question: value});
          }}
          numberOfLines={4}
          multiline={true}
        />
        {errors.question && (
          <Text style={styles.errText}>{errors.question}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Option 1"
          value={questionInfo.opt1}
          placeholderTextColor={'grey'}
          onChangeText={value => {
            setQuestionInfo({...questionInfo, opt1: value});
          }}
        />
        {errors.opt1 && <Text style={styles.errText}>{errors.opt1}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Option 2"
          value={questionInfo.opt2}
          placeholderTextColor={'grey'}
          onChangeText={value => {
            setQuestionInfo({...questionInfo, opt2: value});
          }}
        />
        {errors.opt2 && <Text style={styles.errText}>{errors.opt2}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Option 3"
          value={questionInfo.opt3}
          placeholderTextColor={'grey'}
          onChangeText={value => {
            setQuestionInfo({...questionInfo, opt3: value});
          }}
        />
        {errors.opt3 && <Text style={styles.errText}>{errors.opt3}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Option 4"
          value={questionInfo.opt4}
          placeholderTextColor={'grey'}
          onChangeText={value => {
            setQuestionInfo({...questionInfo, opt4: value});
          }}
        />
        {errors.opt4 && <Text style={styles.errText}>{errors.opt4}</Text>}

        <Text style={styles.selectC}>Select correct answer:</Text>
        <View style={styles.con2}>
          <Picker
            selectedValue={questionInfo.correctAnswer}
            style={styles.input}
            dropdownIconColor={'black'}
            onValueChange={(itemValue, itemIndex) =>
              setQuestionInfo({...questionInfo, correctAnswer: itemValue})
            }>
            <Picker.Item label="Select Correct Answer" value="" />
            <Picker.Item label="Option 1" value="1" />
            <Picker.Item label="Option 2" value="2" />
            <Picker.Item label="Option 3" value="3" />
            <Picker.Item label="Option 4" value="4" />
          </Picker>
        </View>
        {errors.correctAns && (
          <Text style={styles.errText}>{errors.correctAns}</Text>
        )}

        <TouchableOpacity style={styles.loginButton} onPress={saveQuestion}>
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddQuestions;

const styles = StyleSheet.create({
  inputQ: {
    width: '90%',
    height: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: 'black',
    marginBottom: 10,
  },
  addUserText: {
    fontSize: 20,
    color: 'black',
    marginLeft: 15,
  },
  con1: {
    margin: 20,
    flexDirection: 'row',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007BFF',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  con2: {
    backgroundColor: 'white',
    height: 60,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  selectC: {
    color: 'black',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  errText: {
    color: 'red',
    marginBottom: 20,
    marginLeft: 25,
  },
});
