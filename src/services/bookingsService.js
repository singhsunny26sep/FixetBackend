import Eventbookings from "../models/EventbookingsModel.js";
import Event from "../models/eventModel.js";

export const createBooking = async (data) => {
  // optional: check service exists & date availability
  const service = await Service.findById(data.serviceId);
  if (!service) throw new Error("Service not found");
  // optional: check if date already booked by business rule
  const booking = await Booking.create(data);
  return booking;
};

export const getBookingsByCustomer = async (customerId) =>
  Booking.find({ customerId }).sort({ createdAt: -1 });

export const getBookingById = async (id) => Booking.findById(id);
export const updateBookingStatus = async (id, status) =>
  Booking.findByIdAndUpdate(id, { status }, { new: true });
