import { Router } from "express";
import {
  createCreditRequest,
  getRequestsByClientCin,
  getRequestById,
  updateRequestDecision,
  createFollowUp,
  getAllRequests,
 updateRequestStatus
} from "../controllers/requestsController.js";

const router = Router();

router.get("/", getAllRequests);
router.get("/id/:id", getRequestById);  


router.patch("/id/:id/decision", updateRequestDecision);  // Update decision


router.get("/:clientCin", getRequestsByClientCin);        // Get all requests by client CIN


router.post("/", createCreditRequest);

router.post("/follow-up", createFollowUp);

router.put('/:id/status', updateRequestStatus);

export default router;
