import express from "express";
import {loginUser, registerUser, updateProfile, userProfile} from "../controllers/userControllers";
import {authGuard} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile/:userId", authGuard, updateProfile);

export default router;
