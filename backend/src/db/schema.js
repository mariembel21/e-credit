import { pgTable, serial, varchar, date, timestamp, integer, boolean, text } from "drizzle-orm/pg-core";


export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),

  cin: varchar("cin", { length: 8 }).notNull().unique(),

  lastName: varchar("last_name", { length: 256 }).notNull(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  birthDate: date("birth_date").notNull(),
  familyStatus: varchar("family_status", { length: 256 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});



export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),

  clientCin: varchar("client_cin", { length: 8 }).notNull(), // FK logique vers clients.cin

  number: varchar("number", { length: 50 }).notNull().unique(),
  currency: varchar("currency", { length: 10 }).notNull(),
  openingDate: date("opening_date").notNull()
});



export const creditRequests = pgTable("credit_requests", {
  id: serial("id").primaryKey(),

  clientCin: varchar("client_cin", { length: 8 }).notNull(), //  maps snake_case → camelCase
  creditType: varchar("credit_type", { length: 50 }).notNull(),

  amount: integer("amount").notNull(),
  unit: varchar("unit", { length: 20 }).notNull(),
  installments: integer("installments").notNull(),

  observation: varchar("observation", { length: 1000 }),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("En cours"),
});



export const guarantees = pgTable("guarantees", {
  id: serial("id").primaryKey(),

  creditRequestId: integer("credit_request_id").notNull(), // FK logique vers creditRequests.id

  nature: varchar("nature", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  value: integer("value").notNull(),
  currency: varchar("currency", { length: 10 }).notNull()
});



export const attachments = pgTable("attachments", {
  id: serial("id").primaryKey(),

  creditRequestId: integer("credit_request_id").notNull(), // FK logique

  document: varchar("document", { length: 256 }).notNull(), // nom ou chemin du fichier
  isRequired: boolean("is_required").notNull(),
  status: text("status").notNull() 
});


export const followUps = pgTable("follow_ups", {
  id: serial("id").primaryKey(),

 creditRequestId: integer("credit_request_id").notNull().references(() => creditRequests.id),

  contactDate: date("contact_date"), // DD/MM/YYYY
  byWhom: varchar("by_whom", { length: 256 })
});



export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(), 
  clientId: integer("client_id").references(() => clients.id), 
  createdAt: timestamp("created_at").defaultNow(),
});