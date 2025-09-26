import { db } from '../db/db.js';
import { clients, accounts } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const getClientByCin = async (req, res) => {
  const cin = String(req.params.cin).trim();
  try {
    const result = await db
      .select()
      .from(clients)
      .where(eq(clients.cin, cin));

    if (result.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed query: ${err.message}` });
  }
};

export const getAccountsByClientCin = async (req, res) => {
  const cin = String(req.params.cin).trim();

  try {
    const result = await db
      .select()
      .from(accounts)
      .where(eq(accounts.clientCin, cin));

    if (result.length === 0) {
      return res.status(404).json({ message: "No accounts found for this client" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAccountByNumber = async (req, res) => {
  const accountNumber = String(req.params.number).trim();
  try {
    const result = await db
      .select()
      .from(accounts)
      .where(eq(accounts.number, accountNumber));

    if (result.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed query: ${err.message}` });
  }
};
