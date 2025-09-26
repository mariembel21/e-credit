import { db } from "../db/db.js";
import { guarantees } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const createGuarantee = async (req, res) => {
    console.log("DEBUG req.body =", req.body);
    try {
    const { creditRequestId, nature, type, value, currency } = req.body;
    if (!creditRequestId || !nature || !type || !value || !currency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newGuarantee = await db.insert(guarantees).values({
      creditRequestId,
      nature,
      type,
      value,
      currency,
    });

    res.status(201).json({ message: "Guarantee created successfully", newGuarantee });
  } catch (error) {
    console.error("Error creating guarantee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGuaranteesByRequestId = async (req, res) => {
  try {
    const { creditRequestId } = req.params;

    const result = await db.select().from(guarantees).where(eq(guarantees.creditRequestId, Number(creditRequestId)));

    if(result.length === 0) res.status(404).json({error: "not found "})
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching guarantees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
