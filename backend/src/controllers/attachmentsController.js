import { db } from "../db/db.js";
import { attachments } from "../db/schema.js";
export const createAttachment = async (req, res) => {
  try {
    const { creditRequestId } = req.body;
    const file = req.file;

    if (!creditRequestId || !file) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAttachment = await db.insert(attachments).values({
      creditRequestId,
      document: file.filename,    
      isRequired: true,
      status: "pending",
    });

    const fileUrl = `http://localhost:3000/uploads/${file.filename}`;

    res.status(201).json({
      message: "Attachment created successfully",
      fileUrl,
      newAttachment,
    });
  } catch (error) {
    console.error("Error creating attachment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAttachmentsByRequestId = async (req, res) => {
  try {
    const { creditRequestId } = req.params;

    const result = await db.select().from(attachments).where(eq(attachments.creditRequestId, Number(creditRequestId)));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching attachments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
