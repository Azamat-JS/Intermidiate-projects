const { Router } = require("express");
const router = Router();

const { getAllTeachers, getOneTeacher, createTeacher, deleteTeacher, updateTeacher } = require("../controllers/teachers");

router.get("/oqituvchilar", getAllTeachers);
router.post("/oqituvchilar", createTeacher);
router.get("/getOne_teacher/:name", getOneTeacher);
router.put("/update_teacher/:id", updateTeacher);
router.delete("/delete_teacher/:id", deleteTeacher);

module.exports = router;