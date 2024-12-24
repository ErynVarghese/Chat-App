import express from 'express';
import { loginUser, logoutUser, registerUser , updateUserProfile, userLoginStatus, UserProfile, verifyEmail, verifyUser} from '../controllers/auth/UserController.js';
import { adminMiddleware, protect } from '../middleware/authMiddleware.js';
import { deleteUser, getUsers } from '../controllers/auth/AdminController.js';

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",logoutUser);

router.get("/user", protect, UserProfile);

router.patch("/user", protect, updateUserProfile );


router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

router.get("/admin/users", protect, adminMiddleware, getUsers);


router.get("/login-status", userLoginStatus);

router.post("/verify-email" , protect, verifyEmail);

router.post("/verify-user/:verificationToken",  verifyUser);

export default router;

