const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema ({
    departure: String,
    arrival: String,
    date: String,
    time: String,
    description: String,
    user: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    },
    reviews: [{
      user:
      {
        type: Schema.Types.ObjectId,
        ref: 'User' // relates to the Author model
      },  
      comment: String
    }] 
  },
  {
    timestamps: true
  }
);

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;