import Support from "../models/supportModel.js";

// CREATE / UPDATE
export const upsertTicket = async ({ role, category, title, message }) => {
  return await Support.findOneAndUpdate(
    { role, category, title }, // unique
    { message },
    { upsert: true, new: true }
  );
};

// DELETE
export const deleteTicket = async ({ role, category, title }) => {
  return await Support.findOneAndDelete({ role, category, title });
};

// STAFF → All tickets
export const getTicketsByRole = async ({ role }) => {
  return await Support.find({ role }).sort({ createdAt: -1 });
};
