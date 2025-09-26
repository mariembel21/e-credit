// scripts/createAdmin.js
import bcrypt from "bcrypt";
import { db } from "../src/db/db.js";
import { users } from "../src/db/schema.js";
import { eq, and } from "drizzle-orm";

const createOrUpdateAdmin = async () => {
  try {
    const username = "mimi"; // ✅ Pick a unique admin username
    const password = "Mimi!2025"; // Change when needed
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Check if another user has this username
    const [conflictingUser] = await db.select().from(users).where(eq(users.username, username));
    if (conflictingUser && conflictingUser.role !== "admin") {
      console.error(`❌ Cannot set admin username to "${username}" because it is already taken by another user.`);
      process.exit(1);
    }

    // 2️⃣ Find existing admin
    const [existingAdmin] = await db.select().from(users).where(eq(users.role, "admin"));

    if (existingAdmin) {
      console.log("Admin exists. Updating credentials...");
      await db
        .update(users)
        .set({ username, password: hashedPassword })
        .where(eq(users.id, existingAdmin.id));
      console.log("✅ Admin credentials updated successfully!");
    } else {
      console.log("No admin found. Creating new admin...");
      await db.insert(users).values({ username, password: hashedPassword, role: "admin" });
      console.log("✅ Admin created successfully!");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating/updating admin:", err);
    process.exit(1);
  }
};

createOrUpdateAdmin();
