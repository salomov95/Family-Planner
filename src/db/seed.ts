import { db } from './schema'
 import { User } from './schema/user'
 import { Invoice } from './schema/invoice'
import { ShoppingList } from './schema/shopping_list'
import { ShoppingListItem } from './schema/shopping_list_item'
import {
   users, shopping_list, invoices
} from './seed.json'

async function seed() {  
  for (let u in users) {
    const list = (await db.insert(ShoppingList).values({
      maxAmountToSpend: 30000
    }).returning({ insertedId: ShoppingList.id }))[0]

    const user = (await db.insert(User).values({
      username: users[u].username,
      email: users[u].email,
      passkey: '12345',
      shoppingListId: list.insertedId
    }).returning({ insertedId: User.id }))[0]


    for (let p in shopping_list) {
      await db.insert(ShoppingListItem).values({
        shoppingListId: list.insertedId,
        productName: shopping_list[p].product,
        quantity: shopping_list[p].quantity
      })
    }

    for (let i in invoices) {
      await db.insert(Invoice).values({
        amount: invoices[i].amount/10,
        issuer: invoices[i].issuer,
        issuedDate: new Date(invoices[i].issued_date)
          .getTime(),
        dueDate: new Date(invoices[i].due_date)
          .getTime(),
        invoiceCode: invoices[i].invoice_code,
        userId: user.insertedId
      })
    }
  }
}

seed()
  .then(()=>console.log('[SEED] Everything ok.'))
  .then(console.error)
