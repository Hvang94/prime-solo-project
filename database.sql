-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"email" varchar(20) NOT NULL,
	"password" varchar(20) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"admin" BOOLEAN NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "services" (
	"id" serial NOT NULL,
	"service" varchar(20) NOT NULL,
	"total_cost" integer NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "services_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_services" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"services_id" integer NOT NULL,
	"status" BOOLEAN NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	CONSTRAINT "user_services_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);






