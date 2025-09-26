import { db } from '../db/db.js';
import { creditRequests, guarantees, attachments, followUps } from '../db/schema.js';

export async function submitFullCreditRequest(req, res) {
  const { creditRequest, guarantees: guaranteesList, attachments: attachmentsList, followUp } = req.body;

  try {
    console.log("creditRequest received:", req.body.creditRequest);
    await db.transaction(async (trx) => {
 
      const [newRequest] = await trx
        .insert(creditRequests)
        .values(creditRequest)
        .returning();

      const creditRequestId = newRequest.id;

      if (Array.isArray(guaranteesList) && guaranteesList.length > 0) {
        await trx.insert(guarantees).values(
          guaranteesList.map(g => ({ ...g, creditRequestId }))
        );
      }

    
      if (Array.isArray(attachmentsList) && attachmentsList.length > 0) {
        await trx.insert(attachments).values(
          attachmentsList.map(a => ({ ...a, creditRequestId }))
        );
      }

      if (followUp && (followUp.contactDate || followUp.byWhom)) {
        await trx.insert(followUps).values({
          ...followUp,
          creditRequestId,
        });
      }

      res.status(201).json({ success: true, requestId: creditRequestId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la soumission de la demande.' });
  }
}