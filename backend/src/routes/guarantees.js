import express from "express";
import { createGuarantee, getGuaranteesByRequestId } from "../controllers/guaranteesController.js";

const router = express.Router();
router.post("/", createGuarantee);
router.get("/:creditRequestId", getGuaranteesByRequestId);

export default router;
