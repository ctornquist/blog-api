/* eslint-disable consistent-return */
import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';

// create a User with email/pw
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String },
  password: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // only salt/hash if has been modified
  if (!user.isModified('password')) return next();

  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  // return next();
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // Store hash in your password DB. Set the user.password to the hash and return next()
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
  bcryptjs.compare(candidatePassword, this.password, (err, res) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, res);
    }
  });
};

// create UserModel class from schema
const User = mongoose.model('User', UserSchema);

export default User;
