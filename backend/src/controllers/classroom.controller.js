import Classroom from "../models/ClassroomModel.js";
import User from "../models/UserModel.js";
import Subject from "../models/SubjectModel.js";

export const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;
    const institutionId = req.user.institution; // admin ka institution

    const subject = await Subject.create({
      name,
      code,
      institution: institutionId,
    });

    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    console.error("Create Subject Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const createClassroom = async (req, res) => {
  try {
    const { name, subjectId, teacherId } = req.body;
    const institutionId = req.user.institution;

    // Validate subject
    const subject = await Subject.findById(subjectId);
    if (!subject || subject.institution.toString() !== institutionId.toString()) {
      return res.status(404).json({ message: "Subject not found in your institution" });
    }

    // Validate teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher" || teacher.institution.toString() !== institutionId.toString()) {
      return res.status(400).json({ message: "Invalid teacher" });
    }

    const classroom = await Classroom.create({
      name,
      institution: institutionId,
      subject: subjectId,
      teacher: teacherId,
      students: [],
    });

    res.status(201).json({ message: "Classroom created successfully", classroom });
  } catch (error) {
    console.error("Create Classroom Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addStudentsToClassroom = async (req, res) => {
  try {
    const classroomId = req.params.id;
    const { studentIds } = req.body; // array of user IDs

    const classroom = await Classroom.findById(classroomId);
    if (!classroom || classroom.institution.toString() !== req.user.institution.toString()) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // Validate students
    const validStudents = await User.find({
      _id: { $in: studentIds },
      role: "student",
      institution: req.user.institution,
    });

    if (!validStudents.length) return res.status(400).json({ message: "No valid students found" });

    classroom.students.push(...validStudents.map(s => s._id));
    await classroom.save();

    res.status(200).json({ message: "Students added to classroom", classroom });
  } catch (error) {
    console.error("Add Students Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
