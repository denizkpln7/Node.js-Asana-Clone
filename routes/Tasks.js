const express = require("express");
const router = express.Router();
const {
  create,
  index,
  update,
  deleteSection,
  makeComment,
  deleteComment,
  addSubTask,
} = require("../controller/Tasks");
const autenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validation/Tasks");

router.route("/list").get(autenticate, index);

router
  .route("/save")
  .post(autenticate, validate(schemas.createValidation), create);

router.route("/update/:id").post(autenticate, update);

router.route("/make-comment/:id").post(autenticate, makeComment);

router.route("/addSubTask/:id").post(autenticate, addSubTask);

router.route("/:id/commentid").delete(autenticate, deleteComment);
// router
// .route("/delete/:id")
// .delete(autenticate, deletePro)

module.exports = router;
