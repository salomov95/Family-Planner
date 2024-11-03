import { randomUUID } from 'crypto'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const Family = sqliteTable('family', {
  id: text().primaryKey().default(randomUUID())
})
