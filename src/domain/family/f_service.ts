import { FamilyRegistryDTO } from './dto/f_registry_dto'
import { FamilyLoginDTO } from './dto/f_login_dto'
import { FamilyRepository } from '../../db/repository/family';

export class FamilyService {
  private repository: FamilyRepository;

  public constructor(f_repository: FamilyRepository) {
    this.repository = f_repository
  }

  public async register (dto: FamilyRegistryDTO) {
    return await this.repository.save(dto)
      .catch((err)=>console.warn(`[FATAL] ${err}`))
  }

  public async login ({ email, passkey }: FamilyLoginDTO) {
    const family = await this.repository
      .findByEmail(email)
      .catch((err)=>{
        console.warn(`[FATAL] ${err}`)
        throw Error(`No such family <${email}>`)
      })

    if (family?.passkey !== passkey)
      throw Error('Invalid credentials, try again.')

    return {
      ...family,
      passkey: undefined
    }
  }

  public async getInfo (familyId: string) {
    const family = await this.repository
      .find(familyId)
      .catch((err)=>{
        console.warn(`[FATAL] ${err}`)
        throw Error(`No such family <${familyId}>`)
      })

      return {
        ...family,
        id: undefined,
        passkey: undefined
      }
  }
}
