import { Schema, model, Types } from 'mongoose';

interface UserInterface {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  cart: Types.ObjectId;
}

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  },
  { versionKey: false, timestamps: true }
);

export default model<UserInterface>('User', UserSchema, 'users');
