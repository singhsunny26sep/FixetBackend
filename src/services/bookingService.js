// services/bookingService.js
import { Booking } from "../models/BookingModel.js";

import Staff from "../models/staffModel.js";

import Razorpay from "razorpay";

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

class BookingService {
  // create booking, create razorpay order if amount > 0
  async createBooking({ customerId, payload }) {
    // calculate fare based on payload (see util below)
    const fare = calculateFare(payload);

    const b = await Booking.create({
      customerId,
      serviceType: payload.serviceType,
      subService: payload.subService,
      scheduledFor: payload.scheduledFor,
      quantity: payload.quantity || 1,
      extras: payload.extras || [],
      notes: payload.notes,
      pickup: payload.pickup,
      drop: payload.drop || null,
      fare,
      payment: {
        status: fare > 0 ? "created" : "unpaid",
        provider: "razorpay",
        amount: fare,
      },
      timeline: [{ status: "pending", message: "Booking created" }],
    });

    // If fare > 0 create Razorpay order and save orderId
    if (fare > 0) {
      const order = await rzp.orders.create({
        amount: fare, // paise
        currency: "INR",
        receipt: `booking_rcpt_${b._id}`,
        payment_capture: 1,
      });
      b.payment.orderId = order.id;
      b.payment.status = "created";
      await b.save();
    }

    // try auto-assign staff (non-blocking)
    this.tryAutoAssign(b).catch((err) =>
      console.error("auto-assign error", err)
    );

    return b;
  }

  // linear simplistic fare calc - replace with your real logic (distance/time)
  async estimateFare(payload) {
    return calculateFare(payload);
  }

  async getBooking(id) {
    return Booking.findById(id)
      .populate("customerId", "name phone email")
      .populate("staffId", "name phone email");
  }

  async listForCustomer(customerId, { page = 1, limit = 20 } = {}) {
    return Booking.find({ customerId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async listForStaff(staffId, { status, page = 1, limit = 20 } = {}) {
    const q = { staffId };
    if (status) q.status = status;
    return Booking.find(q)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async assignStaff(bookingId, staffId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");

    const staff = await Staff.findById(staffId);
    if (!staff) throw new Error("Staff not found"); // Important fix

    booking.staffId = staffId;
    booking.status = "assigned";
    booking.timeline.push({ status: "assigned", message: "Staff assigned" });

    // mark staff unavailable - adapt to your Staff schema
    await Staff.findByIdAndUpdate(staffId, { isAvailable: false });

    const saved = await booking.save();
    return saved;
  }

  async staffAccept(bookingId, staffId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");
    if (String(booking.staffId) !== String(staffId))
      throw new Error("Not allowed");

    booking.status = "accepted";
    booking.timeline.push({
      status: "accepted",
      message: "Staff accepted booking",
    });
    await booking.save();
    return booking;
  }

  async updateStatus(bookingId, byUserRole, status, meta) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");

    // optional role based checks can be enforced by controller
    booking.status = status;
    booking.timeline.push({
      status,
      message: meta?.message || `${status} by ${byUserRole}`,
    });

    // set timestamps for particular statuses
    if (status === "in_progress") booking.startedAt = new Date();
    if (status === "completed") booking.completedAt = new Date();

    await booking.save();

    // if completed -> free staff
    if (status === "completed" && booking.staffId) {
      await Staff.findByIdAndUpdate(booking.staffId, { isAvailable: true });
    }

    return booking;
  }

  async cancelBooking(bookingId, cancelledBy, reason) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");
    booking.status = "cancelled";
    booking.timeline.push({
      status: "cancelled",
      message: `Cancelled by ${cancelledBy}. ${reason || ""}`,
    });
    booking.cancelledAt = new Date();
    await booking.save();
    // optionally release staff
    if (booking.staffId)
      await Staff.findByIdAndUpdate(booking.staffId, { isAvailable: true });
    return booking;
  }

  async saveTrackingPoint(bookingId, point) {
    // push tracking point; consider TTL or sampling in production
    await Booking.findByIdAndUpdate(bookingId, { $push: { tracking: point } });
  }

  // verify razorpay signature and update booking payment info
  async verifyRazorpay({ orderId, paymentId, signature, bookingId }) {
    // signature verification should be done in controller to use process.env
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        "payment.paymentId": paymentId,
        "payment.signature": signature,
        "payment.status": "paid",
        "payment.capturedAt": new Date(),
        status: booking.status === "pending" ? "pending" : booking.status,
      },
      { new: true }
    );

    return booking;
  }

  // naive auto-assign: find first available verified staff
  async tryAutoAssign(booking) {
    try {
      const staff = await Staff.findOne({
        isVerified: true,
        isAvailable: true,
      });
      if (!staff) return null;
      booking.staffId = staff._id;
      booking.status = "assigned";
      booking.timeline.push({
        status: "assigned",
        message: "Auto-assigned staff",
      });
      await booking.save();
      // mark staff unavailable
      staff.isAvailable = false;
      await staff.save();
      return staff;
    } catch (e) {
      return null;
    }
  }
}

function calculateFare(payload) {
  // Very simple example:
  // base + per-item + extras. Replace with distance/time calculator.
  const base = 30000; // 300.00 INR => paise
  const qty = payload.quantity || 1;
  const extrasCount = (payload.extras || []).length;
  const perItem = 10000 * qty; // 100.00 per item
  const extrasCost = 5000 * extrasCount;
  return base + perItem + extrasCost;
}

export default new BookingService();
