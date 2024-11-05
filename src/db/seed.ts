import { db } from './schema'
 import { Family } from './schema/family'
 import { Invoice } from './schema/invoice'
import { ShoppingList } from './schema/shopping_list'
import { ShoppingListItem } from './schema/shopping_list_item'
import { houses,
   shopping_list, invoices
} from './seed.json'

async function seed() {  
  for (let h in houses) {
    const list = (await db.insert(ShoppingList).values({
      maxAmountToSpend: 30000
    }).returning({ insertedId: ShoppingList.id }))[0]

    const family = (await db.insert(Family).values({
      house: houses[h].house,
      email: houses[h].email,
      passkey: '12345',
      shoppingListId: list.insertedId
    }).returning({ insertedId: Family.id }))[0]


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
        familyId: family.insertedId
      })
    }
  }
}

seed()
  .then(()=>console.log('[SEED] Everything ok.'))
  .then(console.error)
