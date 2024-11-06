import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { UserRepository } from '../../db/repository/user';
import { UserService } from './u_service';

import * as RegistryValidator from './dto/u_registry_dto';
import * as LoginValidator from './dto/u_login_dto';
import * as InfoValidator from './dto/u_data_retrieval_dto';

import { Jwt } from './utils/jwt';

export function UserController (fastify: FastifyInstance) {
  const userService = new UserService(
    new UserRepository())

  fastify.post('/users', async (
    request:FastifyRequest, reply: FastifyReply) => {
      const dto = RegistryValidator
         .validator
         .parse(request.body)

      const result = await userService.register(dto)
         .catch((err)=>reply.code(400).send({ err }))

      reply.code(201).send(result)
  })

  fastify.post('/users/login', async (
    request:FastifyRequest, reply: FastifyReply) => {
      const dto = LoginValidator
         .validator
         .parse(request.body)

      const result = await userService.login(dto)
        .catch((err)=>reply.code(401).send({ err }))

      const token = Jwt.generate(result.id)
      reply.setCookie('jwt-token@v1.0', token)

      reply.code(200).send(result)
  })

  fastify.get('/users/:user_id', async (
    request:FastifyRequest, reply: FastifyReply) => {
      const { user_id } = InfoValidator
         .validator
         .parse(request.params)

      const user = await userService
        .getInfo(user_id)
        .catch((err)=>reply.code(404).send({ err }))

      reply.send({ user })
  })
}
