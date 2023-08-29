import { Schema, Model } from "mongoose";
import IUser from "../types/user";
import Roles from "../types/roles";
import uniqueValidatior from "mongoose-unique-validator";
import validator from "validator";
import passwordValidator from "password-validator";
var passwordSchema = new passwordValidator();
passwordSchema
  .min(8)
  .max(128)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .not()
  .spaces()
  .is()
  .not();

var userNameSchema = new passwordValidator();
userNameSchema.lowercase().max(32).min(3).has().not().spaces();

const userSchema = new Schema({
  role: {
    type: String,
    enum: Object.values(Roles),
    required: true,
    default: Roles.Customer,
  },
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true, validator: passwordSchema },
  adresses: {
    type: [String],
    required: false,
    default: [String],
    // max len is 10
    validator: (v) => Array(v).length <= 10,
  },
  phone: {
    type: Number,
    required: false,
    unique: true,
    validator: [validator.isMobilePhone, "Please fill a valid phone number"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: [validator.isEmail, "Please fill a valid email address"],
  },
  verified: {
    email: {
      type: Boolean,
      required: false,
    },
    phone: {
      type: Boolean,
      required: false,
    },
  },
});

userSchema.plugin(uniqueValidatior);

const User = new Model("User", userSchema);

export default User;
