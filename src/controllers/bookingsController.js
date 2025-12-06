import * as bookingService from "../services/bookingsService.js";

export const createBooking = async (req, res, next) => {
  try {
    const body = req.body;
    // require customerId (from auth) or accept in body
    if (!req.user && !body.customerId)
      return res
        .status(401)
        .json({ success: false, message: "Login required" });
    if (req.user) body.customerId = req.user._id;
    // amount could be service.price or passed by frontend
    const booking = await bookingService.createBooking(body);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

export const myBookings = async (req, res, next) => {
  try {
    const customerId = req.user?._id || req.query.customerId;
    if (!customerId)
      return res
        .status(401)
        .json({ success: false, message: "Login required" });
    const bookings = await bookingService.getBookingsByCustomer(customerId);
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    // admin only action in real app
    const booking = await bookingService.updateBookingStatus(
      req.params.id,
      req.body.status
    );
    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};
