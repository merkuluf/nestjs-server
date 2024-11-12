// src/db/schema.ts

import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

// Define the "users" table
export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

// Define other tables here if needed, for example:
// export const posts = pgTable('posts', { /* columns here */ });
// export const comments = pgTable('comments', { /* columns here */ });

// Optionally, you can create and export a type for each table
export type User = typeof users.$inferSelect; // Type for selecting rows
export type NewUser = typeof users.$inferInsert; // Type for inserting new rows
