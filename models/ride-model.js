const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema ({
    departure: String,
    arrival: String,
    date: String,
    time: String,
    description: String,
    user: String,
  },
  {
    timestamps: true
  }
);

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;