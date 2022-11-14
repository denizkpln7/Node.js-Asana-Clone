const express = require("express");
const router = express.Router();
const {create,index,update,deletePro}=require("../controller/Projects");
const autenticate = require("../middleware/authenticate");
const validate=require("../middleware/validate")
const schemas=require("../validation/Projects")


router
.route("/list")
.get(autenticate, index)



router
.route("/save")
.post(autenticate,validate(schemas.createValidation),  create)

router
.route("/update/:id")
.post(autenticate, update)

router
.route("/delete/:id")
.delete(autenticate, deletePro)



module.exports = router;