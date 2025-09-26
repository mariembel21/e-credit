CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_cin" varchar(8) NOT NULL,
	"number" varchar(50) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"opening_date" date NOT NULL,
	CONSTRAINT "accounts_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"credit_request_id" integer NOT NULL,
	"document" varchar(256) NOT NULL,
	"is_required" boolean NOT NULL,
	"status" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credit_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_cin" varchar(8) NOT NULL,
	"credit_type" varchar(50) NOT NULL,
	"amount" integer NOT NULL,
	"unit" varchar(20) NOT NULL,
	"installments" integer NOT NULL,
	"observation" varchar(1000),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "follow_ups" (
	"id" serial PRIMARY KEY NOT NULL,
	"credit_request_id" integer NOT NULL,
	"contact_date" date,
	"by_whom" varchar(256)
);
--> statement-breakpoint
CREATE TABLE "guarantees" (
	"id" serial PRIMARY KEY NOT NULL,
	"credit_request_id" integer NOT NULL,
	"nature" varchar(50) NOT NULL,
	"type" varchar(50) NOT NULL,
	"value" integer NOT NULL,
	"currency" varchar(10) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "last_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "first_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "birth_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "family_status" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_cin_unique" UNIQUE("cin");