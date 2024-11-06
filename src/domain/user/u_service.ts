import { UserRegistryDTO } from './dto/u_registry_dto';
import { UserLoginDTO } from './dto/u_login_dto';
import { UserRepository } from '../../db/repository/user';

export class UserService {
  private repository: UserRepository;

  public constructor(u_repository: UserRepository) {
    this.repository = u_repository
  }

  public async register (dto: UserRegistryDTO) {
    return await this.repository.save(dto)
      .catch((err)=>console.warn(`[FATAL] ${err}`))
  }

  public async login ({ email, passkey }: UserLoginDTO) {
    const user = await this.repository
      .findByEmail(email)
      .catch((err)=>{
        console.warn(`[FATAL] ${err}`)
        throw Error(`No such user <${email}>`)
      })

    if (user?.passkey !== passkey)
      throw Error('Invalid credentials, try again.')

    return {
      ...user,
      passkey: undefined
    }
  }

  public async getInfo (userId: string) {
    const user = await this.repository
      .find(userId)
      .catch((err)=>{
        console.warn(`[FATAL] ${err}`)
        throw Error(`No such user <${userId}>`)
      })

      return {
        ...user,
        id: undefined,
        passkey: undefined
      }
  }
}
