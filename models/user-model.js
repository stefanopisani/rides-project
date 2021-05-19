const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  bio: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // googleId: String,
  phoneNumber: {
    type: Number,
    required:true
  },
  reviews: [{
    user: String,  
    comment: String,
    rating: Number
  }],
//   rides: {
//     type: Schema.Types.ObjectId,
//     ref: 'Ride' 
//  } 
});

const User = mongoose.model("User", userSchema);
module.exports = User;