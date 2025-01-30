const { Router } = require("express");
const router = Router();

const { createStudent, getAllStudents, getOneStudent, updateStudent, deleteStudent } = require("../controllers/students");
const {studentValidate} = require("../middleware/student_validMiddle");

router.get("/oquvchilar", getAllStudents);
router.post("/oquvchilar", studentValidate, createStudent);
router.get("/getOne_student/:id", getOneStudent);
router.put("/update_student/:id", updateStudent);
router.delete("/delete_student/:id", deleteStudent);

module.exports = router;