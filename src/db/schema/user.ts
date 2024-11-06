import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { ShoppingList } from './shopping_list'
import { relations } from 'drizzle-orm'
import { Invoice } from './invoice'

export const User = sqliteTable('t_user', {
  id: text().primaryKey().$defaultFn(()=>createId()),
  username: text().unique().notNull(),
  funds: integer().notNull().default(0),
  email: text().unique().notNull(),
  passkey: text().notNull(),
  shoppingListId: text('shopping_list_id').notNull()
})

export const userRelations = relations(
  User, ({ one, many })=>({
    shoppingList: one(ShoppingList, {
      fields: [User.shoppingListId],
      references: [ShoppingList.id]
    }),
    invoices: many(Invoice)
  })
)
