import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

import { jwtVerify } from 'jose';


export const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "Not authorized, Login again" });
        }

        console.log("Token", token);
        console.log("key", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);




        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Token expired, please login again" });
        }

        console.log(decoded);
   

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
    
            return res.status(404).json({ message: "User isn't found" });
  

        }
        req.user = user;
        next();


    } catch (error) {
        res.status(401).json({ message: "Not authorized, Login again" });
    }
});

export const adminMiddleware = asyncHandler(async (req, res, next) => {

    if (req.user && req.user.role === "admin") {
        next();
        return;
    }

    res.status(403).json({ message: "Not authorized, you are not an admin" });

});


export const verifiedMiddleware = asyncHandler(async (req, res, next) => {

    if (req.user && req.user.isVerified) {
        next();
        return;
    }

    res.status(403).json({ message: "Not authorized, your email is not verified" });
});