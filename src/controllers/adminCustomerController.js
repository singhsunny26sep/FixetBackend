import {
  getAllCustomersService,
  getCustomerByIdService,
} from "../services/adminCustomerService.js";

//  Get all customers (Admin)
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomersService();
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get single customer by ID (Admin)
export const getCustomerById = async (req, res) => {
  try {
    const customer = await getCustomerByIdService(req.params.id);
    if (!customer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
