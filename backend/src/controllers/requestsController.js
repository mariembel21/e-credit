import { db } from '../db/db.js';
import {
  creditRequests,
  guarantees as guaranteesTable,
  attachments as attachmentsTable,
  followUps,
  clients
  
} from '../db/schema.js';
import { eq } from 'drizzle-orm';

// POST /requests
export const createCreditRequest = async (req, res) => {
  try {
    const {
  cin: clientCin,  // alias `cin` as `clientCin`
  creditType,
  amount,
  unit,
  installments,
  observation,
  guarantees,
  attachments
} = req.body;


    // Create credit request
    const [request] = await db.insert(creditRequests)
      .values({ clientCin, creditType, amount, unit, installments, observation })
      .returning();

    const creditRequestId = request.id;

    // Add guarantees if provided
    if (Array.isArray(guarantees) && guarantees.length > 0) {
      await db.insert(guaranteesTable).values(
        guarantees.map(g => ({ ...g, creditRequestId }))
      );
    }

    // Add attachments if provided
// Add attachments if provided
if (Array.isArray(attachments) && attachments.length > 0) {
  const validAttachments = attachments.filter(
    (a) => a.document !== null && a.document !== undefined && a.document !== ""
  );

  if (validAttachments.length > 0) {
    await db.insert(attachmentsTable).values(
      validAttachments.map(a => ({ ...a, creditRequestId }))
    );
  }
}


    // Fetch full data to return it immediately
    const createdGuarantees = await db
      .select()
      .from(guaranteesTable)
      .where(eq(guaranteesTable.creditRequestId, creditRequestId));

    const createdAttachments = await db
      .select()
      .from(attachmentsTable)
      .where(eq(attachmentsTable.creditRequestId, creditRequestId));

    res.status(201).json({
      message: 'Credit request created',
      creditRequest: {
        ...request,
        guarantees: createdGuarantees,
        attachments: createdAttachments,
        followUps: []
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /requests/:clientCin
export const getRequestsByClientCin = async (req, res) => {
  const clientCin = req.params.clientCin;
  try {
    const requests = await db
      .select()
      .from(creditRequests)
      .where(eq(creditRequests.clientCin, clientCin));

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /requests/id/:id
export const getRequestById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [request] = await db
      .select()
      .from(creditRequests)
      .where(eq(creditRequests.id, id));

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const guarantees = await db
      .select()
      .from(guaranteesTable)
      .where(eq(guaranteesTable.creditRequestId, id));

    const attachments = await db
      .select()
      .from(attachmentsTable)
      .where(eq(attachmentsTable.creditRequestId, id));

    const followUpsList = await db
      .select()
      .from(followUps)
      .where(eq(followUps.creditRequestId, id));

    res.json({
      ...request,
      guarantees,
      attachments,
      followUps: followUpsList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// PATCH /requests/id/:id/decision
export const updateRequestDecision = async (req, res) => {
  const id = parseInt(req.params.id);
  const { decision } = req.body;

  if (!['Validé', 'Rejeté', 'En cours'].includes(decision)) {
    return res.status(400).json({ message: 'Invalid decision' });
  }

  try {
    await db.update(creditRequests)
      .set({ observation: decision }) // using 'observation' as decision
      .where(eq(creditRequests.id, id));

    res.json({ message: `Request ${id} updated to ${decision}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// POST /requests/follow-up
export const createFollowUp = async (req, res) => {
  console.log("Submitting data:", JSON.stringify(data, null, 2));

  const { creditRequestId, contactDate, byWhom } = req.body;

  try {
    const [row] = await db
      .insert(followUps)
      .values({ creditRequestId, contactDate, byWhom })
      .returning();

    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await db
      .select({
        id: creditRequests.id,
        clientCin: creditRequests.clientCin,      
        creditType: creditRequests.creditType,    
        amount: creditRequests.amount,
        unit: creditRequests.unit,
        status: creditRequests.status,
        observation: creditRequests.observation,
        createdAt: creditRequests.createdAt,
        lastName: clients.lastName,
        firstName: clients.firstName,
      })
      .from(creditRequests)
      .leftJoin(clients, eq(creditRequests.clientCin, clients.cin));

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};




export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Le champ 'status' est requis." });
  }

  try {
    await db
      .update(creditRequests)
      .set({ status })
      .where(eq(creditRequests.id, Number(id)));

    res.status(200).json({ message: "Statut mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut." });
  }
};
