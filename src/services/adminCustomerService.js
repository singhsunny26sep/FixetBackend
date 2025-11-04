import Customer from "../models/customerModel.js";

// Get all customers
export const getAllCustomersService = () => {
  return Customer.find().select("-password"); // password hide kar dega
};

// Get single customer
export const getCustomerByIdService = (id) => {
  return Customer.findById(id).select("-password");
};
