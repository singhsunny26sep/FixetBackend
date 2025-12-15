import {
  createBookingService,
  staffAcceptBookingService,
} from "../services/bookingService.js";

// ------------------ Create Booking ------------------
export const createBooking = async (req, res) => {
  try {
    const { userId, zone, requiredItems, bookingType } = req.body;

    const booking = await createBookingService({
      userId,
      zone,
      requiredItems,
      bookingType,
    });

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Staff Accept Booking ------------------
export const staffAcceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const staffId = req.staffId; // staffAuth middleware me set hoga

    const data = await staffAcceptBookingService(bookingId, staffId);

    res.status(200).json({
      success: true,
      message: "Booking accepted",
      booking: data.booking,
      shops: data.nearbyShops,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
