import Booking from "../models/bookingModel.js";
import Staff from "../models/staffModel.js";
import Shop from "../models/productModel.js";

// Create Booking (Customer)
export const createBookingService = async (data) => {
  const { userId, zone, requiredItems, bookingType } = data;

  const booking = await Booking.create({
    userId,
    zone,
    requiredItems,
    bookingType,
  });

  return booking;
};

// Staff accepts booking → find shops
export const staffAcceptBookingService = async (bookingId, staffId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) throw new Error("Booking not found");

  // ✔ Same zone shops
  const shops = await Shop.find({ zone: booking.zone });

  // ✔ Filter shops based on required items
  const matchedShops = shops.map((shop) => {
    const availableItems = shop.items.filter((item) =>
      booking.requiredItems.some((req) => req.itemId === item.itemId)
    );

    return {
      shopId: shop._id,
      shopName: shop.shopName,
      availableItems,
    };
  });

  // Staff ko assign karo
  booking.assignedStaff = staffId;
  booking.status = "assigned";
  await booking.save();

  return {
    booking,
    nearbyShops: matchedShops,
  };
};
