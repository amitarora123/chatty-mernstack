import { Router } from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.route("/logout").post(protectRoute, logout);
router.route("/update-profile").put(protectRoute, updateProfile)
router.route("/checkAuth").get(protectRoute, checkAuth);
export default router;
