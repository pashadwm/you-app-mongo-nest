import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: String,
  gender: String,
  birthday: String,
  age: String,
  horoscope: String,
  zodiac: String,
  height: String,
  heightUnit: String,
  weight: String,
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  password: string;
  displayName: string;
  gender: string;
  birthday: string;
  age: string;
  horoscope: string;
  zodiac: string;
  height: string;
  heightUnit: string;
  weight: string;
}
