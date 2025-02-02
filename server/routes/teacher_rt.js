const { Router } = require("express");
const router = Router();

const { getAllTeachers, getOneTeacher, createTeacher, deleteTeacher, updateTeacher } = require("../controllers/teacher_ctr");

router.get("/teachers", getAllTeachers);
router.post("/teachers", createTeacher);
router.get("/getOne_teacher/:name", getOneTeacher);
router.put("/update_teacher/:id", updateTeacher);
router.delete("/delete_teacher/:id", deleteTeacher);

module.exports = router;