import express from "express";
import { createAttachment } from "../controllers/attachmentsController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();


router.post("/", upload.single("document"), createAttachment);

export default router;
