const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');

const userRouter = express.Router();


// register route
userRouter.post("/api/register", async (req, res) => {

    try {
        const { name, email, password, address } = req.body;
        // console.log(name, email, password, address);

        if (name == undefined || email == undefined || password == undefined || address == undefined) {
            res.status(401).send({ "msg": "Please enter all the details" });
        }
        const alreadyUser = await User.find({ email });
        // console.log(alreadyUser)
        if (alreadyUser.length > 0) {
            res.status(401).send({ "msg": "Already registered" })
        }
        else {
            bcrypt.hash(password, 5, async (err, secure_password) => {
                if (err) {
                    res.status(400).send({ "msg": "Error while registeration" });
                }
                else {
                    const user = new User({ name, email, password: secure_password, address });
                    await user.save();
                    res.status(201).send("Registered successfully");
                }
            })
        }
    } catch (error) {
        console.log("Error occured :", error);
        res.status(400).send({ "msg": "Error during registration" });
    }

});



// login route
userRouter.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email == undefined || password == undefined) {
            res.status(400).send({ "msg": "Please enter all credentials" });
        }
        const alreadyUser = await User.findOne({ email });
        // console.log(alreadyUser)
        if (!alreadyUser) {
            res.status(401).send({ "msg": "User not registered" })
        }
        else {

            bcrypt.compare(password, alreadyUser.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ id: alreadyUser._id }, "tushar");
                    res.status(201).send({ "msg": "Login successful", "token": token })
                }
                else {
                    res.status(401).send({ "msg": "Wrong Credentials" })
                }
            });
        }

    } catch (error) {
        res.status(400).send({ "msg": "Error during Login" });
    }
});


// update password route
userRouter.patch("/api/user/:id",async(req,res)=>{
    try {
        const ID= req.params.id;
        const {password}= req.body;
        if(password==undefined){
            res.status(400).send({ "msg": "Please enter new password" });
        }
        else{
            bcrypt.hash(password,5,async(err,secure)=>{
                if(err){
                    res.status(400).send({ "msg": "Something went wrong" });
                }
                else{
                    const user = await User.findByIdAndUpdate(ID,{password:secure});
                    res.status(204).send({"msg": "User password updated successfully"});
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Error during updating password"})
    }
})







module.exports = {
    userRouter
}