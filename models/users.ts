import mongoose, { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import validator from "validator";
import mongooseHidden from "mongoose-hidden";

interface IUser {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "A username is required to sign up."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A email is required to sign up."],
    unique: true,
    validate: (email: string) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: [true, "A password is required to sign up."],
    validate: (password: string) => validator.isStrongPassword(password),
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre("save", function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  next();
});

export function validatePassword(
  plainTextPassword: string,
  hashedPasswordfromDB: string
) {
  return bcrypt.compareSync(plainTextPassword, hashedPasswordfromDB);
}

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }));

const User = model<IUser>("User", userSchema);

export default User;
