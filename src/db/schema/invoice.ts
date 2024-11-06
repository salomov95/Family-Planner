import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { User } from './user'
import { relations } from 'drizzle-orm'

export const Invoice = sqliteTable('t_invoice', {
  id: text().primaryKey().$defaultFn(()=>createId()),
  type: text().notNull().default('BILL'),
  dueDate: integer('due_date').notNull(),
  issuedDate: integer('issued_date').notNull(),
  issuer: text().notNull(),
  invoiceCode: text('invoice_code').notNull(),
  amount: integer().notNull(),
  userId: text('user_id').notNull().references(()=>User.id),
  status: text().notNull().default('UNPAID')
})

export const invoiceRelations = relations(Invoice, ({ one }) => ({
  family: one(User, {
     fields: [Invoice.userId],
     references: [User.id]
  })
}))
