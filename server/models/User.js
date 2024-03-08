import mongoose from 'mongoose';
import { db1 } from '../db.js'; 

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pass the client instance to the mongoose.model function
const UserModel = db1.model('User', UserSchema);

export { UserModel as User };
