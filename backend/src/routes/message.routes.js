import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();

router.get("/users", protectRoute, getUsersForSidebar)

export default router;