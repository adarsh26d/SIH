import Institution from "../models/InstitutionModel.js";
import User from "../models/UserModel.js";

export const addInstitution = async (req, res) => {
    try {
        if(req.user.role != "admin"){
            return res.status(403).json({
                message: "Access denied - Admins only"
            })
        }

        const {name, address} = req.body

        if(!name || !address){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingInstitution = await Institution.findOne({ name })
        if(existingInstitution){
            return res.status(400).json({
                message: "Institution already exists"
            })
        }

        const newInstitution = await Institution.create({name, address})

        return res.status(201).json({
            message: "Institution added successfully",
            newInstitution
        })
    } catch (error) {
        console.log("Error in add institution controller", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getInstitutions = async(req, res) => {
    try {
        const institutions = await Institution.find().select("name address");
        return res.status(200).json({ institutions })
    } catch (error) {
        console.log("Error in get institution controller", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const addTeacher = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const { userId } = req.body; 

    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    const teacher = await User.findById(userId);
    if (!teacher) {
      return res.status(404).json({ message: "User not found" });
    }

    teacher.role = "teacher";
    teacher.institution = institutionId;

    await teacher.save();

    res.status(200).json({
      message: `User ${teacher.name} assigned as teacher`,
      teacher,
    });
  } catch (error) {
    console.error("Add Teacher Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const { userId } = req.body;

    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    const student = await User.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    student.role = "student";
    student.institution = institutionId;

    await student.save();

    res.status(200).json({
      message: `User ${student.name} assigned as student`,
      student,
    });
  } catch (error) {
    console.error("Add Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};