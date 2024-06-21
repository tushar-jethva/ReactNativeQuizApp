// database.ts
import SQLite, {ResultSet} from 'react-native-sqlite-storage';
import {User} from '../src/models/UserModel';
import {Alert, ToastAndroid} from 'react-native';
import {Question} from '../src/models/QuestionModel';
import {Attempt} from '../src/models/AttempModels';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'QuizManagment.db';
const database_version = '1.0';
const database_displayname = 'QuizManagement';
const database_size = 200000;

export default class DatabaseService {
  db: SQLite.SQLiteDatabase | null = null;

  getDBConnection = async () => {
    try {
      this.db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });
      console.log('Database opened');
      await this.createTables();
    } catch (error) {
      console.error('Failed to open database', error);
    }
  };

  async createTables() {
    if (!this.db) return;

    const createUserTableQuery = `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone_number TEXT,
        profile_pic TEXT,
        role TEXT
      );`;

    const createQuestionsTableQuery = `CREATE TABLE IF NOT EXISTS Questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        option1 TEXT NOT NULL,
        option2 TEXT NOT NULL,
        option3 TEXT NOT NULL,
        option4 TEXT NOT NULL,
        correct_option INTEGER NOT NULL
    );`;

    const createQuizAttemptsTableQuery = `CREATE TABLE IF NOT EXISTS QuizAttempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      chosen_option INTEGER,
      is_correct BOOLEAN,
      FOREIGN KEY (user_id) REFERENCES Users (id),
      FOREIGN KEY (question_id) REFERENCES Questions (id)
  );`;

    await this.db.executeSql(createUserTableQuery);
    await this.db.executeSql(createQuestionsTableQuery);
    await this.db.executeSql(createQuizAttemptsTableQuery);
    await this.createAdmin();
  }

  //Create Admin
  async createAdmin(): Promise<void> {
    if (!this.db) return;
    const queryA = `Select * from Users where role = ?`;
    const [results] = await this.db.executeSql(queryA, ['admin']);
    if (results.rows.length == 0) {
      const query = `INSERT INTO Users (username, password, phone_number, profile_pic,role) VALUES (?, ?, ?, ?,?)`;
      await this.db.executeSql(query, ['tushar', '123456', '', '', 'admin']);
      console.log('user is created');
      ToastAndroid.show('User is created!', 1000);
    }
  }

  // CRUD operations for Users
  async createUser(user: User): Promise<void> {
    if (!this.db) return;
    const query = `INSERT INTO Users (username, password, phone_number, profile_pic,role) VALUES (?, ?, ?, ?,?)`;
    await this.db.executeSql(query, [
      user.username,
      user.password,
      user.phone_no,
      user.profilePic,
      'user',
    ]);
    console.log('user is created');
    ToastAndroid.show('User is created!', 1000);
  }
  async updateUser(user: User): Promise<void> {
    if (!this.db || !user.id) return;
    const query = `UPDATE Users SET username = ?, password = ?, phone_number = ?, profile_pic = ? WHERE id = ?`;
    await this.db.executeSql(query, [
      user.username,
      user.password,
      user.phone_no,
      user.profilePic,
      user.id,
    ]);
  }

  async deleteUser(id: number): Promise<void> {
    if (!this.db) return;
    const query = `DELETE FROM Users WHERE id = ?`;
    await this.db.executeSql(query, [id]);
  }

  async getAllUsers(): Promise<User[]> {
    if (!this.db) return [];
    const [results] = await this.db.executeSql(`SELECT * FROM Users`, []);
    console.log(results);
    const users: User[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      users.push({
        id: row.id,
        username: row.username,
        password: row.password,
        phone_no: row.phone_number,
        profilePic: row.profile_pic,
        role: row.role, // assuming all fetched users have 'user' role for now
      });
    }
    console.log('GET ALL USERS - WORKED');
    return users;
  }

  async getUser(username: String, password: String): Promise<User | null> {
    if (!this.db) return null;
    const [results] = await this.db.executeSql(
      `SELECT * FROM Users WHERE username = ? AND password = ?`,
      [username, password],
    );
    if (results.rows.length > 0) {
      const row = results.rows.item(0);
      return {
        id: row.id,
        username: row.username,
        password: row.password,
        phone_no: row.phone_number,
        profilePic: row.profile_pic,
        role: row.role,
      };
    }
    return null;
  }

  //CRUD for questions
  async createQuestion(question: Question): Promise<void> {
    if (!this.db) return;
    const query = `INSERT INTO Questions (question, option1, option2, option3, option4, correct_option) VALUES (?, ?, ?, ?, ?, ?)`;
    await this.db.executeSql(query, [
      question.question,
      question.opt1,
      question.opt2,
      question.opt3,
      question.opt4,
      question.correctAnswer,
    ]);
  }

  async getAllQuestions(): Promise<Question[]> {
    if (!this.db) return [];
    const [results] = await this.db.executeSql(`SELECT * FROM Questions`, []);
    console.log(results);
    const users: Question[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      users.push({
        id: row.id,
        question: row.question,
        opt1: row.option1,
        opt2: row.option2,
        opt3: row.option3,
        opt4: row.option4,
        correctAnswer: row.correct_option,
      });
    }
    console.log('All Questions are found!');
    return users;
  }

  async updateQuestion(question: Question): Promise<void> {
    if (!this.db || !question.id) return;
    const query = `UPDATE Questions SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correct_option = ? WHERE id = ?`;
    await this.db.executeSql(query, [
      question.question,
      question.opt1,
      question.opt2,
      question.opt3,
      question.opt4,
      question.correctAnswer,
      question.id,
    ]);
  }

  async deleteQuestion(id: number): Promise<void> {
    if (!this.db) return;
    const query = `DELETE FROM Questions WHERE id = ?`;
    await this.db.executeSql(query, [id]);
  }

  //quiz attempts
  async createAttempt(attempt: Attempt): Promise<void> {
    if (!this.db) return;
    const query = `INSERT INTO QuizAttempts (user_id, question_id, chosen_option, is_correct) VALUES (?, ?, ?, ?)`;
    await this.db.executeSql(query, [
      attempt.userId,
      attempt.questionId,
      attempt.chosenOption,
      attempt.isTrue,
    ]);
  }

  async deleteAttempt(attempt: Attempt): Promise<void> {
    if (!this.db) return;
    const queryD = `DELETE FROM QuizAttempts where user_id = ?`;
    await this.db.executeSql(queryD, [attempt.userId]);
  }

  async getAttemptById(id: number): Promise<Attempt[]> {
    if (!this.db) return [];
    const [results] = await this.db.executeSql(
      `SELECT * FROM QuizAttempts WHERE user_id = ?`,
      [id],
    );
    const attemts: Attempt[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      attemts.push({
        id: row.id,
        userId: row.user_id,
        questionId: row.question_id,
        chosenOption: row.chosen_option,
        isTrue: row.is_correct,
      });
    }
    return attemts;
  }
}

// Initialize the database
const databaseService = new DatabaseService();
export {databaseService};
