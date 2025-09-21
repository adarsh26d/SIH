import Institution from "../models/InstitutionModel.js";
import User from "../models/UserModel.js";

export const assignAdmin = async (req, res) => {
  try {
    const { institutionId, userId } = req.body;

    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only superadmin can assign admins" });
    }

    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // User ka role update
    user.role = "admin";
    user.institution = institution._id;
    await user.save();

    return res.status(200).json({
      message: `User ${user.name} assigned as admin for ${institution.name}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
