import * as partnerService from "../services/partnerservice.js";

// Register
export const registerPartner = async (req, res) => {
  try {
    const partner = await partnerService.registerPartner(req.body);
    res.status(201).json({ success: true, partner });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Upload Documents (with multer)
export const uploadDocuments = async (req, res) => {
  try {
    const { gstNumber } = req.body;
    const files = req.files;

    const documents = {
      shopPhoto: files?.shopPhoto?.[0]?.path || "",
      panCard: files?.panCard?.[0]?.path || "",
      other: files?.other?.[0]?.path || "",
    };

    const partner = await partnerService.uploadDocuments(req.params.id, {
      gstNumber,
      documents,
    });

    res.status(200).json({
      success: true,
      message:
        "Documents uploaded successfully. Waiting for admin verification.",
      partner,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Verify / Reject Partner (Admin)
export const verifyPartner = async (req, res) => {
  try {
    const { verified, notes } = req.body;
    const partner = await partnerService.verifyPartner(
      req.params.id,
      verified,
      notes
    );
    res.status(200).json({ success: true, partner });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Partner Login
export const loginPartner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { partner, token } = await partnerService.loginPartner(
      email,
      password
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      partner,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
