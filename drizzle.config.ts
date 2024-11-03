import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

type TDIALECT = "postgresql" | "mysql" | "sqlite" | "turso"

export default defineConfig({
  out: './src/db/migration',
  schema: './src/db/schema',
  dialect: `${process.env.DB_DIALECT}` as TDIALECT,
  dbCredentials: {
    url: `${process.env.DB_URL}`
  }
})
