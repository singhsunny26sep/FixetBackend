import Booking from "../models/bookingModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

class BookingService {
  // Create booking + razorpay order
  async createBooking(data) {
    const {
      customerId,
      serviceId,
      packageId,
      scheduleDate,
      scheduleTime,
      amount,
      location,
      paymentMethod,
    } = data;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    const booking = await Booking.create({
      customerId,
      serviceId,
      packageId,
      scheduleDate,
      scheduleTime,
      location,
      payment: {
        orderId: order.id,
        amount,
        method: paymentMethod,
        status: "pending",
      },
    });

    return { booking, order };
  }

  // Verify Razorpay Payment
  async verifyPayment({ orderId, paymentId, signature }) {
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (expected !== signature) return null;

    return Booking.findOneAndUpdate(
      { "payment.orderId": orderId },
      {
        $set: {
          "payment.paymentId": paymentId,
          "payment.signature": signature,
          "payment.status": "paid",
        },
      },
      { new: true }
    );
  }

  // Status update
  async updateStatus(id, status) {
    return Booking.findByIdAndUpdate(id, { status }, { new: true });
  }

  // Assign staff
  async assignStaff(id, staffId) {
    return Booking.findByIdAndUpdate(id, { staffId }, { new: true });
  }

  // Live location update
  async updateLiveLocation(id, lat, lng) {
    return Booking.findByIdAndUpdate(
      id,
      {
        tracking: {
          liveLocation: { lat, lng },
          isTrackingActive: true,
        },
      },
      { new: true }
    );
  }

  // Get single booking
  async getBooking(id) {
    return Booking.findById(id)
      .populate("customerId")
      .populate("serviceId")
      .populate("staffId");
  }

  // Get all bookings of a customer
  async getCustomerBookings(customerId) {
    return Booking.find({ customerId }).sort({ createdAt: -1 });
  }
}

export default new BookingService();
