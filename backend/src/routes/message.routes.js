import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getUsersForSidebar, getMessages, sendMessage} from "../controllers/message.controller.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(protectRoute)
router.get("/users", getUsersForSidebar)
router.get("/:id", getMessages)
router.post("/send/:id",upload.single("image"), sendMessage)

export default router;