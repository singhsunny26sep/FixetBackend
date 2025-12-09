import Support from "../models/supportModel.js";

export const createTicket = async ({
  role,
  type,
  category,
  title,
  message,
}) => {
  return await Support.create({
    role,
    type,
    category,
    title,
    message,
  });
};

export const getTicketsByRole = async ({ role }) => {
  return await Support.find({ role })
    .populate("category", "name")
    .sort({ createdAt: -1 });
};

export const deleteTicket = async ({ id }) => {
  return await Support.findByIdAndDelete(id);
};
