import asyncHandler from 'express-async-handler';
import User from '../../models/auth/UserModel.js';
import generateToken from '../../helpers/generateToken.js';

export const registerUser = asyncHandler(async (req, res) => {
    const {name,email, password } = req.body;

    // Empty figenerateToken;heck
    if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
    }

    // Password length check
    if (password.length < 8) {
       return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
 

    const UserExists = await User.findOne({ email });

    if (UserExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
    }


    const user = await User.create({ 
        name, 
        email, 
        password 
    });

    // Generate JWT token
    const token = generateToken(user._id);

    res.cookie("token", token, { 
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 45, 
        sameSite: true,
        secure: true,
    });

    console.log (token);


    if (user){
        const { _id, name, email, role, photo , bio , isVerified } = user;

        res.status(201).json({ message: 'User registered successfully', 
            user: {         
            _id,
            name, 
            email,
            role,
            photo,
            bio, 
            isVerified, 
            token,
        } });
    } else {
        res.status(400).json({ message: 'Invalid User data' });
    }

});


export const loginUser = asyncHandler(async (req, res) => {

    const {email , password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
        return res.status(401).json({ message: 'User not found, please Register' });
    }

});