import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { ShoppingListItem } from './shopping_list_item'

export const ShoppingList = sqliteTable('t_shopping_list', {
  id: text().primaryKey().$defaultFn(()=>createId()),
  maxAmountToSpend: integer('max_amount_to_spend')
    .notNull()
    .default(0)
})

export const shoppingListItems = relations(ShoppingList, ({ many })=>({
  items: many(ShoppingListItem)
}))
