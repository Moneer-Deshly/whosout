import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN!
  },
  verbose: true,
  strict: true,
})