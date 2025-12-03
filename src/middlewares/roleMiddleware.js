export const authRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found in request",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not allowed to access this resource",
      });
    }

    next();
  };
};
