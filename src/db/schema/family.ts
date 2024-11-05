import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { ShoppingList } from './shopping_list'
import { relations } from 'drizzle-orm'
import { Invoice } from './invoice'

export const Family = sqliteTable('t_family', {
  id: text().primaryKey().$defaultFn(()=>createId()),
  house: text().unique().notNull(),
  funds: integer().notNull().default(0),
  email: text().unique().notNull(),
  passkey: text().notNull(),
  shoppingListId: text('shopping_list_id').notNull()
})

export const familyRelations = relations(
  Family, ({ one, many })=>({
    shoppingList: one(ShoppingList, {
      fields: [Family.shoppingListId],
      references: [ShoppingList.id]
    }),
    invoices: many(Invoice)
  })
)
