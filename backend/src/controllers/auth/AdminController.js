import asyncHandler from 'express-async-handler';
import User from '../../models/auth/UserModel.js';

export const deleteUser =asyncHandler(async (req, res) => {

    try {
    //params -> User Id from the URL
    const {id} = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: ' Error', error:error.message }); 
    }

});

export const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({});
    console.log(users);

try {
        if(!users){
            return res.status(404).json({ message: 'No users found' });
        }
    
        res.status(200).json(users);
} catch (error) {
    
    res.status(500).json({ message: 'Error', error:error.message });
}

});
