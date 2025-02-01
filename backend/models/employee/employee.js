const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt for password hashing

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  empId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true
  }
  ,
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preferences' // Assuming you have a Preferences model
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});

// Hash the password before saving it to the database
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password is not modified, don't hash it
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});


employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Employee', employeeSchema);
