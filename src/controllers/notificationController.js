// src/controllers/notificationController.js
import * as notificationService from "../services/notificationService.js";

export const sendNotification = async (req, res) => {
  try {
    const { title, message, type, zones, recipientId } = req.body;
    const { role, _id } = req.admin;

    if (role === "zoneAdmin" && type === "global") {
      return res.status(403).json({
        success: false,
        message: "ZoneAdmin cannot send global notifications",
      });
    }

    if (role === "supportAdmin" && type !== "personal") {
      return res.status(403).json({
        success: false,
        message: "SupportAdmin can only send personal messages",
      });
    }

    if (role === "zoneAdmin" && (!zones || zones.length === 0)) {
      return res
        .status(400)
        .json({ success: false, message: "ZoneAdmin must provide zones" });
    }

    const data = {
      title,
      message,
      type,
      zones: zones || [],
      recipientId,
      role,
      createdBy: _id,
    };

    const notification = await notificationService.createNotification(data);

    res.status(201).json({
      success: true,
      message: "Notification sent successfully",
      data: notification,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to send notification",
    });
  }
};

// 👇 Make sure this function also exists and is exported
export const getNotifications = async (req, res) => {
  try {
    const { role, _id } = req.admin;
    let filter = {};

    if (role === "zoneAdmin")
      filter = { $or: [{ type: "global" }, { type: "zone" }] };
    else if (role === "supportAdmin")
      filter = { $or: [{ type: "personal" }, { recipientId: _id }] };

    const notifications = await notificationService.getAllNotifications(filter);
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications" });
  }
};
