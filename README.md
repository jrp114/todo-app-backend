# Todo App Backend

## Description

This repository serves as the backend for the Todo Application.

## Technologies

The app is created using Nodejs, Typescript and PostgreSQL.

## Running Project Locally

To get the project up and running locally you will need to do the following:

1. Install Docker and docker-compose locally
2. Run the `docker-compose up` within the root directory of the project
3. Create and populate the .env file from the .env.example
4. Install the packages using `npm install`
5. Run the project using `npm run dev`

## Migrations

Migrations are used to structure the database. This project uses the
`db-migrate` package.

**Add migration:** `npm run db-create <name-of-migration-file>`

**Run migrations:** `npm run db-up`

**Revert migration:** `npm run db-down`

## Database Type Generation

This project uses
[tgriesser schemats](https://www.npmjs.com/package/@tgriesser/schemats) to
generate TypeScript typings from the database schema. Anytime the database
structure is changed, the `generate:sql` script needs to be run to update the
`db-interfaces.ts` file. You will need to install the package globally

## Build System

This project uses TypeScript as its primary language and `tsc` (TypeScript
Compiler) as the build system.
