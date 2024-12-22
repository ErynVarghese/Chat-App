import express from 'express';
import { loginUser, logoutUser, registerUser , UserProfile} from '../controllers/auth/UserController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",logoutUser);

router.get("/user", protect, UserProfile)

export default router;

