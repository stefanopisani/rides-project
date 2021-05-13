const express = require('express');
const router = express.Router();
const Ride = require('../models/ride-model');
const User = require('../models/user-model');

// Get all rides 
router.get('/rides', async (req, res) => {
  try {
    const allrides = await Ride.find();
    res.status(200).json(allrides);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

// Create Ride
router.post('/rides', async (req, res) => {
  const {
    departure,
    arrival,
    date,
    time,
    description
  } = req.body
  if (!departure || !arrival || !date || !time) {
    res.status(400).json('missing fields');
    return
  }
  try {
    const response = await Ride.create({
      departure,
      arrival,
      date,
      time,
      description
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

// Delete Ride

router.delete('/rides/:id', async (req, res) => {
  try {
    await Ride.findByIdAndRemove(req.params.id);
    res.status(200).json(`ride with ID:${req.params.id} deleted`)
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

// Get by ID
router.get('/rides/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    res.status(200).json(ride);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Update Project

router.put('/rides/:id', async (req, res) => {
  const {
    departure,
    arrival,
    date,
    time,
    description,
  } = req.body;
  try {
    await Ride.findByIdAndUpdate(req.params.id, {
      departure,
      arrival,
      date,
      time,
      description,
    });
    res.status(200).json(`ride with ID:${req.params.id} updated`);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

// User profile (get by ID)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});


// Update User

router.put('/users/:id', async (req, res) => {
  const {
    username ,
    email,
    password,
    imageUrl,
    bio
  } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, {
      username ,
      email,
      password,
      imageUrl,
      bio
    });
    res.status(200).json(`user with ID:${req.params.id} updated`);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

module.exports = router;