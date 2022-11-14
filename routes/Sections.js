const express = require("express");
const router = express.Router();
const {
  create,
  index,
  update,
  deleteSection} = require("../controller/Sections");
const autenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validation/Sections");

router.route("/list").get(autenticate, index);

router
.route("/save")
.post(autenticate,validate(schemas.createValidation),  create)

// router
// .route("/update/:id")
// .post(autenticate, update)

// router
// .route("/delete/:id")
// .delete(autenticate, deletePro)

module.exports = router;
