import Booking from "../models/Booking.js";

/**
 * @desc    Create new booking
 * @route   POST /api/bookings
 * @access  Public (or Protected if you add auth)
 */
export const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      vehicleNumber,
      serviceType,
      date,
      time,
    } = req.body;

    // Basic validation
    if (
      !customerName ||
      !phone ||
      !vehicleNumber ||
      !serviceType ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const booking = await Booking.create({
      customerName,
      phone,
      vehicleNumber,
      serviceType,
      date,
      time,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create Booking Error:", error.message);
    res.status(500).json({
      message: "Server error while creating booking",
    });
  }
};


/**
 * @desc    Get all bookings
 * @route   GET /api/bookings
 * @access  Protected (admin)
 */
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get Bookings Error:", error.message);
    res.status(500).json({
      message: "Server error while fetching bookings",
    });
  }
};


/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id/status
 * @access  Protected (admin)
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error("Update Booking Error:", error.message);
    res.status(500).json({
      message: "Server error while updating booking",
    });
  }
};


/**
 * @desc    Delete booking
 * @route   DELETE /api/bookings/:id
 * @access  Protected (admin)
 */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error.message);
    res.status(500).json({
      message: "Server error while deleting booking",
    });
  }
};