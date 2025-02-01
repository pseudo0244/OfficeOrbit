const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to Employee who made the booking
    required: true
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat', // Reference to the Seat being booked
    required: true
  },
  startDate: {
    type: Date, // The start date of the booking (date only)
    required: true
  },
  endDate: {
    type: Date, // The end date of the booking (date only)
    required: true
  },
  startTime: {
    type: String, // Start time of booking (like '08:00 AM')
    required: true
  },
  endTime: {
    type: String, // End time of booking (like '06:00 PM')
    required: true
  },
  status: {
    type: String,
    enum: ['Booked', 'Completed', 'Cancelled', 'Unreserved'], // Status of the booking
    default: 'Booked'
  }
});

// Method to check if a new booking overlaps with existing ones
bookingSchema.statics.isBookingOverlap = async function (seatId, startDate, endDate, startTime, endTime) {
  const bookings = await this.find({
    seat: seatId,
    status: { $ne: 'Cancelled' } // Ignore cancelled bookings
  });

  for (const booking of bookings) {
    // Check for date overlap
    const isSameDay = startDate <= booking.endDate && endDate >= booking.startDate;
    // Check for time overlap within the working hours of that day
    const isTimeOverlap = (startTime <= booking.endTime && endTime >= booking.startTime);

    if (isSameDay && isTimeOverlap) {
      return true; // There is an overlap, booking cannot be made
    }
  }
  
  return false; // No overlap found
};

// Method to update seat status after 10 PM (unreserved) for night shifts
bookingSchema.methods.checkNightShift = function () {
  const currentTime = new Date();
  const endTime = new Date(this.endDate);

  // If the current time is after 10 PM and booking end time is before or at 10 PM
  if (currentTime > endTime && endTime.getHours() >= 22) {
    this.status = 'Unreserved'; // Mark the seat as unreserved
    return this.save();
  }
};

module.exports = mongoose.model('Booking', bookingSchema);
