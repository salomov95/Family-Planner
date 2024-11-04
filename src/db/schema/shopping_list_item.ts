import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { ShoppingList } from './shopping_list'

export const ShoppingListItem = sqliteTable('t_shopping_list_item', {
  id: text().primaryKey().$defaultFn(()=>createId()),
  shoppingListId: text('shopping_list_id').notNull().references(()=>ShoppingList.id),

  productName: text('product_name').notNull(),
  quantity: integer().notNull().default(1)
})
