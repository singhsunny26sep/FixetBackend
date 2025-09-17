import {
  createFeeService,
  getFeesService,
  updateFeeService,
  deleteFeeService,
  createMultipleFeesService,
} from "../services/feeService.js";

// CREATE single
export const createFee = async (req, res) => {
  try {
    const fee = await createFeeService(req.body);
    res.status(201).json({ success: true, data: fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// BULK CREATE multiple
export const createMultipleFees = async (req, res) => {
  try {
    // req.body should be an array
    const fees = await createMultipleFeesService(req.body);
    res.status(201).json({ success: true, data: fees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all or filtered
export const getFees = async (req, res) => {
  try {
    const fees = await getFeesService(req.query.type); // ?type=uniform
    res.json({ success: true, data: fees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE single
export const updateFee = async (req, res) => {
  try {
    const fee = await updateFeeService(req.params.id, req.body);
    res.json({ success: true, data: fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE single
export const deleteFee = async (req, res) => {
  try {
    await deleteFeeService(req.params.id);
    res.json({ success: true, message: "Fee deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
