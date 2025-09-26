import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";
import { users, clients, accounts } from "../db/schema.js";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET;


export const register = async (req, res) => {
  const { username, password, client, account } = req.body;

  try {
    
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    
    const [existingClient] = await db
      .select()
      .from(clients)
      .where(eq(clients.cin, client.cin));

    let clientId;
    if (!existingClient) {
      
      const [newClient] = await db
        .insert(clients)
        .values({
          cin: client.cin,
          firstName: client.firstName,
          lastName: client.lastName,
          birthDate: client.birthDate,
          familyStatus: client.familyStatus
        })
        .returning();

      clientId = newClient.id;
    } else {
      clientId = existingClient.id;
    }

    
    const [existingAccount] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.number, account.accountNumber))
      .where(eq(accounts.clientCin, client.cin));

    if (existingAccount) {
      return res.status(400).json({ message: "This account number already exists for this client" });
    }

    await db.insert(accounts).values({
      clientCin: client.cin,
      number: account.accountNumber,
      currency: account.devise,
      openingDate: account.creationDate
    });

    
    const hashedPassword = await bcrypt.hash(password, 10);
await db.insert(users).values({
  username,
  password: hashedPassword,
  role: "client",
  clientId
});


    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "username/password required" });

    const [user] = await db.select().from(users).where(eq(users.username, username));
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined! Check your .env file.");
      return res.status(500).json({ message: "Server misconfiguration: missing JWT secret" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    let client = null;
    if (user.clientId) {
      const [c] = await db.select().from(clients).where(eq(clients.id, user.clientId));
      client = c || null;
    }

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role, clientId: user.clientId },
      client
    });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Login error" });
  }
};
