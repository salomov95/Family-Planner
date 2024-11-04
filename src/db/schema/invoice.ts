import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { Family } from './family'

export const Invoce = sqliteTable('t_invoice', {
  id: text().primaryKey().$defaultFn(()=>createId()),
  type: text().notNull().default('BILL'),
  dueDate: integer('due_date').notNull(),
  issuedDate: integer('issued_date').notNull(),
  issuer: text().notNull(),
  invoiceCode: text('invoice_code').notNull(),
  amount: integer().notNull(),
  familyId: text('family_id').notNull().references(()=>Family.id),
  status: text().notNull().default('UNPAID')
})
