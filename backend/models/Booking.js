import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number is required"],
    },

    serviceType: {
      type: String,
      required: [true, "Service type is required"],
    },

    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },

    time: {
      type: String,
      required: [true, "Booking time is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);