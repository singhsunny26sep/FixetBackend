import bookingService from "../services/bookingService.js";

class BookingController {
  async createBooking(req, res) {
    try {
      const data = await bookingService.createBooking(req.body);
      res.json({ success: true, data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async verifyPayment(req, res) {
    try {
      const booking = await bookingService.verifyPayment(req.body);
      if (!booking)
        return res.json({
          success: false,
          message: "Payment verification failed",
        });

      res.json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const booking = await bookingService.updateStatus(
        req.params.id,
        req.body.status
      );
      res.json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async assignStaff(req, res) {
    try {
      const booking = await bookingService.assignStaff(
        req.params.id,
        req.body.staffId
      );
      res.json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateLiveLocation(req, res) {
    try {
      const booking = await bookingService.updateLiveLocation(
        req.params.id,
        req.body.lat,
        req.body.lng
      );
      res.json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getBooking(req, res) {
    try {
      const booking = await bookingService.getBooking(req.params.id);
      res.json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getCustomerBookings(req, res) {
    try {
      const bookings = await bookingService.getCustomerBookings(
        req.params.customerId
      );
      res.json({ success: true, bookings });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

export default new BookingController();
