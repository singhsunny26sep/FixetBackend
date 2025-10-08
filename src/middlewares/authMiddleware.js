import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import Customer from "../models/customerModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;
      if (decoded.role === "staff") {
        user = await Staff.findById(decoded.id)
          .populate("categories")
          .populate("subCategories")
          .populate("primaryService")
          .populate("secondaryServices");
      } else if (decoded.role === "customer") {
        user = await Customer.findById(decoded.id);
      }

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

    
      req.user = user;
      req.user.role = decoded.role;

      next();
    } catch (error) {
      console.error("Protect middleware error:", error.message);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
};
