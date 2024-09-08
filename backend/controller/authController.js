import User from "../models/userModel.js";
import bycrypt from 'bcryptjs'
import generateToken from "../utils/generatetoken.js";
const signup = async (req, res) => {
    try {
        const { fullname, username, password, gender } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(404).json({ error: "User Already exist!" });
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if(newUser){
        await generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic
        });
        }else{
            res.status(400).json({error:"invalid user data"})
        }
    } catch (error) {
        console.log("Error in server", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const {username,password} = req.body;
    const user = await User.findOne({username});
    const isCorrectPassword = await bycrypt.compare(password,user.password);

    if(!user || !isCorrectPassword) {
      return res.status(404).json({Error:"Invalid User details"});
    }

    generateToken(user._id,res);

    res.status(201).json({
        userId:user._id,
        fullname:user.fullname,
        username:user.username,
        profilepic:user.profilepic
    })
    } catch (error) {
        res.json({error:"User Not Exist"});
    }

};

const logout = async (req, res) => {
   try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({
        message:"Logout Successfully"
    })
   } catch (error) {
    res.send({message:"Internal server Error"});
   }
};

export { login, signup, logout };
