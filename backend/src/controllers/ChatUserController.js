import User from "../models/auth/UserModel.js";

export const getUsersForSidebar = async(req,res) => {

    try {

        const loggedInUser = req.user._id;

        const allUsers = await User.find( {id: {$ne: loggedInUser} }).select("-password");

        res.status(200).json(allUsers);
        
    } catch (error) {

        console.error("Error getting users", error.message);
        res.status(500).json({ message: "Error getting users", error: error.message });

        
    }
}