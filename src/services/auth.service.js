import createHttpError from 'http-errors';
import validator from "validator";
import UserModel from '../models/userModel.js';

const {DEFAULT_PICTURE,DEFAULT_STATUS} = process.env

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest("Please fill all fields");
  }
  //check status length
  if (status && status.length > 64) {
    if (status.length > 60) {
      throw createHttpError.BadRequest(
        "Please make sure your status is less than 64 characters"
      );
    }
  }
  //check if email adress is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valiid email"
    );
  }
  const checkDb = await UserModel.findOne({email});
  if(checkDb){
    throw createHttpError.Conflict("Please try again with a different email address,this email already")
  }


  if(!validator.isLength(password,{
    min:6,
    max:128
  })){
    throw createHttpError.BadRequest('Please make sure your password is between 6 and 128 characters')
  }
  const user = await new UserModel({
    name,
    email,
    picture:picture || DEFAULT_PICTURE,
    status:status ||  DEFAULT_STATUS,
    password,
  }).save();

  return user;
}