const middlewareController = require("../controllers/middlewareController");
const User = require("../model/userSchema");
const userController = require("../controllers/userController");

const router = require("express").Router();
//Get all user
router.get("/", middlewareController.verifyToken,userController.getAllUser);
//DELEte user
///v1/user/id{any?}
router.delete("/:id", middlewareController.verifyTokenAndAdmin,userController.deleteUser);
//get a user
// router.get('/auser',middlewareController.verifyToken,(req,res)=>{
//     user = res.send(req.User.email)
//     res.status(200).json(user);
// })
module.exports = router;    