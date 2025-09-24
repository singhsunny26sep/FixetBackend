import Support from "../models/supportModel.js";

// CREATE / UPDATE Ticket
export const upsertTicket = async ({
  email,
  role,
  type,
  title,
  message,
  imageUrl,
}) => {
  return await Support.findOneAndUpdate(
    { email, role, title }, // unique key per user & title
    { type, message, imageUrl },
    { upsert: true, new: true }
  );
};

// DELETE Ticket
export const deleteTicket = async ({ email, role, title }) => {
  return await Support.findOneAndDelete({ email, role, title });
};

// GET Tickets by role
export const getTicketsByRole = async ({ role }) => {
  return await Support.find({ role });
};

// GET single Ticket by email & title
export const getTicket = async ({ email, title }) => {
  return await Support.findOne({ email, title });
};
