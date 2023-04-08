import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    select: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
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

userSchema.pre('save', async function (next: any) {
  try {
    // check if it is modified
    if (!this.isModified('password')) {
      return next();
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, 10);
    // set to the newly hashed password
    this.password = hashedPassword;
    // call the nest operation
    return next();
  } catch (error) {
    return next(error);
  }
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  readonly password: string;
  createdAt: Date;
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
