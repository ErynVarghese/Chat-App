import express from 'express';
import { loginUser, logoutUser, registerUser , updateUserProfile, UserProfile} from '../controllers/auth/UserController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",logoutUser);

router.get("/user", protect, UserProfile)

router.patch("/user", protect, updateUserProfile )

export default router;

