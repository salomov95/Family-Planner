import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'

export const db = drizzle({
  connection: `${process.env.DB_URL}`,
  casing: 'snake_case'
})

export { Family } from './family'
export { Invoce } from './invoice'
export { ShoppingList } from './shopping_list'
export { ShoppingListItem } from './shopping_list_item'

