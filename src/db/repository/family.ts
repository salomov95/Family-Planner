import { eq } from 'drizzle-orm';
import { type Database } from '../index.d'
import { db, Family, ShoppingList } from '../schema'

import { FamilyRegistryDTO } from '../../domain/family//dto/f_registry_dto'

export class FamilyRepository {
  private db: Database;

  public constructor() {
    this.db = db
  }

  public async save (dto: FamilyRegistryDTO) {
    const [{ shoppingListId }] = await this.db
       .insert(ShoppingList)
       .values({ })
       .returning({ shoppingListId: ShoppingList.id})

    await this.db
      .insert(Family)
      .values({
         ...dto,
         shoppingListId
      })
      .catch(()=>{
         throw Error(`Failed registering family <${dto.house}>`)
      })

    return { ok: true }
  }

  public async find(id: string) {
    const family = await this.db.select()
      .from(Family)
      .where(eq(Family.id, id))
      .get()
      .catch(()=>{ throw Error('Not such family') })
    
    return family
  }

  public async findByEmail(email: string) {
    const family = await this.db.select()
      .from(Family)
      .where(eq(Family.email, email))
      .get()
      .catch(()=>{ throw Error('Not such family') })

    return family
  }
}
