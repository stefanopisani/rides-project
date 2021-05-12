const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema ({
    departure: String,
    arrival: String,
    date: Date,
    time: TimeRanges,
    description: String,
    user: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    },
    reviews: [{
      user: String,  //current user ?
      comment: String
    }] 
  },
  {
    timestamps: true
  }
);

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;