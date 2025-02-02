const express = require("express");
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getGroupByName,
  updateGroup,
  deleteGroup,
} = require("../controllers/groups");
const {groupValidate} = require("../middleware/group_validMiddl");

router.get("/groups", getAllGroups)
router.post("/groups", createGroup)
router.get("/groups/:name", getGroupByName);
router.put("/update_group/:id", updateGroup);
router.delete("/delete_group/:id", deleteGroup);

module.exports = router;