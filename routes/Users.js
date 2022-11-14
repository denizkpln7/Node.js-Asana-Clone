const express = require("express");
const router = express.Router();
const {create,index,login,projectList,resetPassword,update,updateProfileImage}=require("../controller/Users")
const autenticate = require("../middleware/authenticate");
const validate=require("../middleware/validate")
const schemas=require("../validation/Users")

router.get("/list", index)
router
.route("/")
.post(validate(schemas.createValidation),  create)
router.post("/login", login)

router
.route("/userpro")
.get(autenticate, projectList)

router
.route("/reset-password")
.post(resetPassword)

router
.route("/update")
.post(autenticate, update)

router
.route("/update-profile-image")
.post(autenticate, updateProfileImage)




module.exports = router;