import walletService from "../services/walletService.js";

export const getWallet = async (req, res) => {
  const wallet = await walletService.getWallet(req.user._id);
  res.json({ success: true, wallet });
};

export const createAddMoneyOrder = async (req, res) => {
  const order = await walletService.addMoneyOrder(
    req.user._id,
    req.body.amount
  );
  res.json({ success: true, order });
};

export const verifyAddMoney = async (req, res) => {
  const result = await walletService.verifyAddMoneyPayment({
    orderId: req.body.orderId,
    paymentId: req.body.paymentId,
    signature: req.body.signature,
    userId: req.user._id,
    amount: req.body.amount,
  });

  res.json({ success: true, wallet: result });
};

export const deductWallet = async (req, res) => {
  const wallet = await walletService.deduct(
    req.user._id,
    req.body.amount,
    req.body.description
  );
  res.json({ success: true, wallet });
};

export const adminWalletCredit = async (req, res) => {
  const wallet = await walletService.addByAdmin(
    req.body.userId,
    req.body.amount,
    "Admin Adjust"
  );
  res.json({ success: true, wallet });
};
