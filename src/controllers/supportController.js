import * as supportService from "../services/supportService.js";

export const createTicket = async (req, res) => {
  try {
    const { role, type, categoryId, title, message } = req.body;

    const ticket = await supportService.createTicket({
      role,
      type,
      category: categoryId,
      title,
      message,
    });

    res.status(201).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const role = req.headers["x-role"];
    if (!role)
      return res.status(400).json({ success: false, message: "Role missing" });

    const tickets = await supportService.getTicketsByRole({ role });

    res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await supportService.deleteTicket({ id });

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
