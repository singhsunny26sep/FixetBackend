import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerAdmin = async (data) => {
  const { name, email, password, role, zone } = data;

  const existing = await Admin.findOne({ email });
  if (existing) {
    throw new Error("Admin already exists with this email");
  }

  const admin = await Admin.create({ name, email, password, role, zone });
  return admin;
};

export const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: admin._id, role: admin.role, zone: admin.zone },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      zone: admin.zone,
    },
  };
};
