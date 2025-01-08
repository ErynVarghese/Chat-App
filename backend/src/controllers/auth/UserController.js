import asyncHandler from 'express-async-handler';
import User from '../../models/auth/UserModel.js';
import generateToken from '../../helpers/generateToken.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../../models/auth/Token.js';
import crypto from 'crypto';
import SendEmail from '../../helpers/SendEmail.js';
import hashedToken from '../../helpers/HashToken.js';

// register 

export const registerUser = asyncHandler(async (req, res) => {
    const {name,email, password } = req.body;

    
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
        secure: process.env.NODE_ENV === "production",
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

// login 
export const loginUser = asyncHandler(async (req, res) => {

    const {email , password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    console.log("USEREXISTS", userExists);

    if (!userExists) {
        return res.status(401).json({ message: 'User not found, please Register' });
    }

    console.log(userExists.password,password);

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(userExists._id.toString());

    if (userExists && isMatch){
        const { _id, name, email, role, photo , bio , isVerified } = userExists;
    

    res.cookie("token", token, { 
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 45, 
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: 'User logged in successfully', 
        _id,
        name, 
        email,
        role,
        photo,
        bio,
        isVerified, 
        token,
     });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }

});

// logout 
export const logoutUser = asyncHandler(async (req, res) => {
    
    res.clearCookie("token");

    res.status(200).json({ message: 'User logged out successfully' });
 
});

// get 
export const UserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select('-password');
    console.log(user);

    if (user){
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }

});

// update 
export const updateUserProfile = asyncHandler(async (req, res) => {

        const user = await User.findById(req.user._id);
        
        if (user){
            const { name, photo, bio } = req.body;
        
            user.name = req.body.name || user.name;
            user.photo = req.body.photo || user.photo;
            user.bio = req.body.bio || user.bio;
        
            const updated = await user.save();

            res.status(200).json({
                _id: updated._id,
                name: updated.name,
                photo: updated.photo,
                bio: updated.bio,
                email: updated.email,
                role: updated.role,
            })
        } else {
            res.status(404).json({ message: 'User not found' });
        }
});



export const userLoginStatus = asyncHandler(async (req, res) => {

    const token = req.cookies.token;

    if (!token){
        res.status(401).json({ message: 'User not logged in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded){
        res.status(200).json(true);
    } else {
        res.status(401).json(false);
    }


});


export const verifyEmail= asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if(!user){
        return res.status(404).json({ message: 'User not found' });

    }

    if (user.isVerified){

        return res.status(400).json({ message: 'Email already verified' });
    }

    let token = await Token.findOne({ userId: user._id});

    if (token){
        await Token.deleteOne({ userId: user._id });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex') + user._id;

    const hashedTokenValue = hashedToken(verificationToken);
    
    await new Token({
        userId: user._id,
        verificationToken: hashedTokenValue,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
    }).save();

    // verifcation link

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    // send email

    const subject = 'Email Verification - Task Manager App';
    const send_to = user.email;
    const reply_to = 'noreply@taskmanagerapp.com';
    const template = "EmailVerifTemplate";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const link = verificationLink;

    try {
        await SendEmail(subject, send_to, reply_to, template, name, link, send_from);
        return res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
        console.log('Failed to send email', error.message);
        console.error("Error sending email: ", error.response.body);
        return res.status(500).json({ message: 'Failed to send email' });
    }

});

export const verifyUser = asyncHandler(async (req, res) => {

    const { verificationToken } = req.params;

    if(!verificationToken) {
        return res.status(404).json({ message: 'Verification token not found' });
    }

    const hashedTokenValue = hashedToken(verificationToken);

    const userToken = await Token.findOne({ verificationToken: hashedTokenValue, expiresAt: {$gt : Date.now()}});
  
    if(!userToken) {
        return res.status(404).json({ message: 'Invalid or expired verification token' });
    }

    const user = await User.findById(userToken.userId);

    if (user.isVerified){
        return res.status(400).json({ message: 'Email already verified' });

    }

    user.isVerified = true;
    await user.save();
    res.status(200).json({message : "User Successfully Verfied"});

});

export const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if(!email) {
        return res.status(400).json({ message: 'Email not provided' });
    }

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    let token = await Token.findOne({ userId: user._id});

    if (token){
        await Token.deleteOne();
    }

    const passwordResetToken = crypto.randomBytes(20).toString('hex') + user._id;

    const hashedTokenValue = hashedToken(passwordResetToken);

    await new Token({
        userId: user._id,
        passwordResetToken: hashedTokenValue,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
    }).save();

    
    const passwordResetLink = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;

    const subject = 'Password Reset - Task Manager App';
    const send_to = user.email;
    const reply_to = 'noreply@taskmanagerapp.com';
    const template = "PasswordResetTemplate";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const link = passwordResetLink;


    try {
        await SendEmail(subject, send_to, reply_to, template, name, link, send_from);
        return res.status(200).json({ message: 'Password reset email sent successfully' });
        
    } catch (error) {
        console.log("Failed to send Password reset Email:" , error);
        return res.status(500).json({ message: 'Failed to send password reset email' });
    }


});


export const resetPassword = asyncHandler(async (req, res) => {

    const { ResetPasswordToken } = req.params;
    
    const { password} = req.body;

    if(!ResetPasswordToken){
        return res.status(404).json({ message: 'Reset password token not found' });
    }




    const hashedTokenValue = hashedToken(ResetPasswordToken);

    const userToken = await Token.findOne({ passwordResetToken: hashedTokenValue, expiresAt: {$gt : Date.now()}});

    if(!userToken){
        return res.status(404).json({ message: 'Invalid or expired reset password token' });
    }

    const user = await User.findById(userToken.userId);

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully!" });

});



export const ChangePassword = asyncHandler(async (req, res) => {

    const { CurrentPassword, NewPassword } = req.body;

       
    if(!CurrentPassword || !NewPassword){
        return res.status(400).json({ message: 'Current or new password not provided' });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(CurrentPassword, user.password);

    if(!isMatch){
        return res.status(401).json({ message: 'Current password is incorrect' });
    }

    if (isMatch){
        user.password = NewPassword;
        await user.save();
        return res.status(200).json({ message: "Password changed successfully!" });
    } else {
        return res.status(500).json({ message: 'Failed to change password' });
    }



});