import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../../db/repository/user';
import { UserService } from './u_service'
import { UserRegistryDTO } from './dto/u_registry_dto'
import { UserLoginDTO } from './dto/u_login_dto';

export function UserController (fastify: FastifyInstance) {
  const userService = new UserService(
    new UserRepository())

  fastify.post('/users', async (
    request:FastifyRequest,
    reply: FastifyReply)=>{

    if (!request.body) {
      reply.code(400).send({
        ok: false,
        error: 'Invalid data sent!'
      })
    }

    const dto = request.body as UserRegistryDTO
    const result = await userService.register(dto)
      .catch((err)=>reply.code(400).send({ err }))

    reply.code(201).send(result)
  })

  fastify.post('/users/login', async (
    request:FastifyRequest,
    reply: FastifyReply)=>{
      if (!request.body) {
        reply.code(401).send({
          ok: false,
          error: 'Invalid data sent!'
        })
      }

      const dto = request.body as UserLoginDTO
      const result = await userService.login(dto)
        .catch((err)=>reply.code(401).send({ err }))

      reply.code(200).send(result)
  })

  fastify.get('/users/:id', async (
    request:FastifyRequest,
    reply: FastifyReply)=>{
      const params = request.params as any
      const user = await userService
        .getInfo(`${params['id']}`)
        .catch((err)=>reply.code(404).send({ err }))

      reply.send({ user })
  })
}
