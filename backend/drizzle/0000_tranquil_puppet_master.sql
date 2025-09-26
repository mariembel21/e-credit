CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"cin" varchar(8) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
