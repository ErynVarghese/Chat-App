import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

export const protect = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "Not authorized, Login again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(404).json({ message: "User isn't found" });

        }
        req.user = user;
        next();


    } catch (error) {
        res.status(401).json({ message: "Not authorized, Login again" });
    }
});