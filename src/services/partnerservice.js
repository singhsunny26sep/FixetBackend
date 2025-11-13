import Partner from "../models/partnermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new partner
export const registerPartner = async (data) => {
  const {
    name,
    shopName,
    email,
    phone,
    password,
    address,
    bankName,
    accountNumber,
  } = data;

  const existing = await Partner.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  const partner = await Partner.create({
    name,
    shopName,
    email,
    phone,
    password: hashed,
    address,
    bankName,
    accountNumber,
  });

  return partner;
};

// Upload partner documents
export const uploadDocuments = async (partnerId, docsData) => {
  const partner = await Partner.findByIdAndUpdate(
    partnerId,
    {
      $set: {
        gstNumber: docsData.gstNumber,
        documents: docsData.documents,
        status: "pending_verification",
      },
    },
    { new: true }
  );
  if (!partner) throw new Error("Partner not found");
  return partner;
};

// Verify / Reject Partner (Admin)
export const verifyPartner = async (partnerId, verified, notes) => {
  const status = verified ? "verified" : "rejected";

  const partner = await Partner.findByIdAndUpdate(
    partnerId,
    {
      $set: {
        status,
        isVerified: verified,
        verificationNotes: notes || "",
      },
    },
    { new: true }
  );
  if (!partner) throw new Error("Partner not found");
  return partner;
};

// Partner Login
export const loginPartner = async (email, password) => {
  const partner = await Partner.findOne({ email });
  if (!partner) throw new Error("Partner not found");

  const isMatch = await bcrypt.compare(password, partner.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (partner.status !== "verified") {
    throw new Error("Your account is pending admin verification.");
  }

  // ✅ Generate JWT token
  const token = jwt.sign(
    { id: partner._id, email: partner.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const partnerObj = partner.toObject();
  delete partnerObj.password;

  return { partner: partnerObj, token };
};
