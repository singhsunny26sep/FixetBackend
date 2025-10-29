import Notification from "../models/notificationModel.js";
import firebaseAdmin from "../config/firebase.js";
import Staff from "../models/staffModel.js";
import Customer from "../models/customerModel.js";

export const createNotification = async (data) => {
  // Save notification in DB
  const notification = await Notification.create(data);

  //  Prepare tokens array
  let tokens = [];

  if (data.type === "global") {
    const staff = await Staff.find().select("fcmToken -_id");
    const customers = await Customer.find().select("fcmToken -_id");
    tokens = [...staff, ...customers].map((u) => u.fcmToken).filter(Boolean);
  } else if (data.type === "zone") {
    const staff = await Staff.find({ zone: { $in: data.zones } }).select(
      "fcmToken -_id"
    );
    const customers = await Customer.find({ zone: { $in: data.zones } }).select(
      "fcmToken -_id"
    );
    tokens = [...staff, ...customers].map((u) => u.fcmToken).filter(Boolean);
  } else if (data.type === "personal" && data.recipientId) {
    const user =
      (await Staff.findById(data.recipientId)) ||
      (await Customer.findById(data.recipientId));
    if (user?.fcmToken) tokens = [user.fcmToken];
  }

  //  Send push notification via Firebase
  if (tokens.length > 0) {
    const message = {
      notification: { title: data.title, body: data.message },
      tokens,
    };
    try {
      const response = await firebaseAdmin.messaging().sendMulticast(message);
      console.log(" FCM sent:", response.successCount);
    } catch (err) {
      console.error(" FCM error:", err);
    }
  } else {
    console.log(" No FCM tokens found for this notification.");
  }

  return notification;
};

export const getAllNotifications = async (filter = {}) => {
  return await Notification.find(filter).sort({ createdAt: -1 });
};
