import * as supportService from "../services/supportService.js";

// CREATE / UPDATE
export const createOrUpdateTicket = async (req, res) => {
  const { name, email, role, type, title, message, imageUrl } = req.body;
  try {
    const ticket = await supportService.upsertTicket({
      email,
      role,
      type,
      title,
      message,
      imageUrl,
    });
    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteTicket = async (req, res) => {
  const { email, role, title } = req.body;
  try {
    const deleted = await supportService.deleteTicket({ email, role, title });
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET → role-based
export const getTickets = async (req, res) => {
  const role = req.headers["x-role"];
  if (!role)
    return res
      .status(400)
      .json({ success: false, message: "Role header missing" });

  try {
    const tickets = await supportService.getTicketsByRole({ role });
    res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
