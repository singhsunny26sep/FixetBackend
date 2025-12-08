import * as supportService from "../services/supportService.js";

// CREATE / UPDATE
export const createOrUpdateTicket = async (req, res) => {
  const { role, category, title, message } = req.body;

  if (!category || !title || !message) {
    return res.status(400).json({
      success: false,
      message: "Category, Title and Message are required",
    });
  }

  try {
    const ticket = await supportService.upsertTicket({
      role,
      category,
      title,
      message,
    });

    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteTicket = async (req, res) => {
  const { role, category, title } = req.body;

  try {
    const deleted = await supportService.deleteTicket({
      role,
      category,
      title,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET (by role)
export const getTickets = async (req, res) => {
  const role = req.user.role; // from JWT

  try {
    const tickets = await supportService.getTicketsByRole({ role });
    res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
