import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import Customer from "../models/customerModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const role = decoded.role?.toLowerCase(); // IMPORTANT FIX

      let user = null;

      if (role === "staff") {
        user = await Staff.findById(decoded.id)
          .populate("categories")
          .populate("subCategories")
          .populate("primaryService")
          .populate("secondaryServices");
      } else if (role === "customer") {
        user = await Customer.findById(decoded.id);
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid user role in token",
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      req.user.role = role;

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }
};
