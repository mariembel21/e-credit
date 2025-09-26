import { db } from "../db/db.js";
import { followUps } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const addFollowUp = async (req, res) => {
  try {
    const { creditRequestId, contactDate, byWhom } = req.body;
    if (!creditRequestId) {
      return res.status(400).json({ error: "Missing creditRequestId" });
    }

    const newFollowUp = await db.insert(followUps).values({
      creditRequestId,
      contactDate: contactDate || null,
      byWhom: byWhom || null,
    });

    res.status(201).json({ message: "Follow-up added successfully", newFollowUp });
  } catch (error) {
    console.error("Error adding follow-up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFollowUpsByRequestId = async (req, res) => {
  try {
    const { creditRequestId } = req.params;

    const result = await db.select().from(followUps).where(eq(followUps.creditRequestId, Number(creditRequestId)));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching follow-ups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
