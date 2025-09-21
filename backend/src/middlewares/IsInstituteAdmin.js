export const isInstitutionAdmin = async (req, res, next) => {
  try {
    const institutionId = req.params.id;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied - Only admins can perform this action",
      });
    }

    if (!req.user.institution || req.user.institution.toString() !== institutionId) {
      return res.status(403).json({
        message: "Access denied - You are not the admin of this institution",
      });
    }

    next();
  } catch (error) {
    console.error("Institution Admin Middleware Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

