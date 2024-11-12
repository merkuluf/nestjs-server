import { pgTable, text, integer, serial, varchar } from 'drizzle-orm/pg-core'; // Use 'pg-core' for PostgreSQL-specific schema helpers

// Define your table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: text('password').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
});
