import { eq } from 'drizzle-orm';
import { type Database } from '../index.d'
import { db, User, ShoppingList } from '../schema'

import { UserRegistryDTO } from '../../domain/user/dto/u_registry_dto'

export class UserRepository {
  private db: Database;

  public constructor() {
    this.db = db
  }

  public async save (dto: UserRegistryDTO) {
    const { shoppingMaxAmount, ...rest } = dto
    const [{ shoppingListId }] = await this.db
       .insert(ShoppingList)
       .values({
         maxAmountToSpend: shoppingMaxAmount
       })
       .returning({ shoppingListId: ShoppingList.id})

    await this.db
      .insert(User)
      .values({
         ...rest,
         shoppingListId
      })
      .catch((err)=>{
         throw Error(`Failed registering user <${dto.username}>` + err)
      })

    return { ok: true }
  }

  public async find(userId: string) {
    const user = await this.db.query.User
      .findFirst({
        where: eq(User.id, userId),
        with: {
          invoices: true,
          shoppingList: {
            with: {
              items: true
            }
          }
        }
      })
      .catch((err)=>{
        throw Error('Not such user' + err)
      })

    return user
  }

  public async findByEmail(email: string) {
    const user = await this.db.query.User
      .findFirst({ where: eq(User.email, email) })
      .catch((err)=>{
        throw Error('Not such user' + err)
      })

    return user
  }
}
