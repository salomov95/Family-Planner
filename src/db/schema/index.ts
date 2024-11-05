import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'

import * as f_schema from './family'
import * as i_schema from './invoice'
import * as sl_chema from './shopping_list'
import * as sli_chema from './shopping_list_item'

export const db = drizzle({
  connection: `${process.env.DB_URL}`,
  casing: 'snake_case',
  schema: {
    ...f_schema,
    ...i_schema,
    ...sl_chema,
    ...sli_chema
  }
})

export { Family } from './family'
export { Invoice } from './invoice'
export { ShoppingList } from './shopping_list'
export { ShoppingListItem } from './shopping_list_item'

