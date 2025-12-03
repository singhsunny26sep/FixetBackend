import Wallet from "../models/walletModel.js";

import Razorpay from "razorpay";
import crypto from "crypto";

class WalletService {
  async getWallet(userId) {
    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0 });
    }

    return wallet;
  }

  async addMoneyOrder(userId, amount, paymentMethod) {
    const razor = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await razor.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "wallet_" + Date.now(),
      notes: {
        userId,
        paymentMethod,
      },
    });

    return order;
  }

  async verifyAddMoneyPayment(data) {
    const { orderId, paymentId, signature, userId, amount } = data;

    const body = orderId + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      throw new Error("Payment Verification Failed");
    }

    const wallet = await Wallet.findOne({ userId });

    wallet.balance += amount;

    wallet.transactions.push({
      type: "credit",
      amount,
      description: "Wallet Recharge",
    });

    return await wallet.save();
  }

  async deduct(userId, amount, description = "Booking Payment") {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet || wallet.balance < amount) {
      throw new Error("Insufficient Wallet Balance");
    }

    wallet.balance -= amount;

    wallet.transactions.push({
      type: "debit",
      amount,
      description,
    });

    return await wallet.save();
  }

  async addByAdmin(userId, amount, description = "Admin Credit") {
    const wallet = await Wallet.findOne({ userId });

    wallet.balance += amount;

    wallet.transactions.push({
      type: "credit",
      amount,
      description,
    });

    return await wallet.save();
  }
}

export default new WalletService();
