import User from "../models/userModel.js";

const getUsers = async (req,res) => {
try {
    const logedInUser = req.user._id;

    const allusers = await User.find({_id: {$ne: logedInUser}}).select("-password");
    res.status(200).json(allusers);
} catch (error) {
    console.log("error", error);
    res.status(501).json({message:error});
}
}


export { getUsers }