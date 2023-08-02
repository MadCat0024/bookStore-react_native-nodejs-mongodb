const User = require("../model/userSchema");

const userController = {
    //get a user
    // getAUser: async(req, res)=>{
    //     try {
    //         const user = await User.findOne()
    //         res.status(200).json(user);
    //     } catch (err) {
    //         res.status(500).json(err.msg);
    //     }
    // },
    //Get all user 
    getAllUser: async(req, res)=>{
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.msg);
        }
    },
    //Delete user 
    deleteUser : async(req,res)=>{
        try {
            //if y want to delete user, user "findById and delete"
           const user = await User.findById(req.params.id);
            res.status(200).json("Detele successfuly");
        } catch (err) {
            res.status(500).json(err.msg);
        }
    }
}

module.exports = userController;