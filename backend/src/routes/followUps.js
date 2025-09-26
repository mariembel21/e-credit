import express from "express";
import { addFollowUp, getFollowUpsByRequestId } from "../controllers/followUpsController.js";

const router = express.Router();


router.post("/", addFollowUp);
router.get("/:creditRequestId", getFollowUpsByRequestId);

export default router;
