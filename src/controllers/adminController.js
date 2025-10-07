import * as adminService from "../services/adminService.js";

export const register = async (req, res) => {
  try {
    const admin = await adminService.registerAdmin(req.body);
    res.status(201).json({ success: true, message: "Admin registered", admin });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await adminService.loginAdmin(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
