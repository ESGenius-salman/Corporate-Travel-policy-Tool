// middleware/roleMiddleware.js
// middleware/roleMiddleware.js
const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - No user info found" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied - Insufficient role" });
      }

      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      res.status(500).json({ message: "Server error in role middleware" });
    }
  };
};

module.exports = roleMiddleware;
