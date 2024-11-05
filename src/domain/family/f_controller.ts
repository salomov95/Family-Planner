import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FamilyRepository } from '../../db/repository/family';
import { FamilyService } from './f_service'
import { FamilyRegistryDTO } from './dto/f_registry_dto'
import { FamilyLoginDTO } from './dto/f_login_dto';

export function FamilyController (fastify: FastifyInstance) {
  const familyService = new FamilyService(
    new FamilyRepository())

  fastify.post('/family/register', async (
    request:FastifyRequest,
    reply: FastifyReply)=>{

    if (!request.body) {
      reply.code(400).send({
        ok: false,
        error: 'Invalid data sent!'
      })
    }

    const dto = request.body as FamilyRegistryDTO
    const result = await familyService.register(dto)
      .catch((err)=>reply.code(400).send({ err }))

    reply.code(201).send(result)
  })

  fastify.post('/family/login', async (
    request:FastifyRequest,
    reply: FastifyReply)=>{
      if (!request.body) {
        reply.code(401).send({
          ok: false,
          error: 'Invalid data sent!'
        })
      }

      const dto = request.body as FamilyLoginDTO
      const result = await familyService.login(dto)
        .catch((err)=>reply.code(401).send({ err }))

      reply.code(200).send(result)
  })

  fastify.get('/family/:id', async (
    request:FastifyRequest,
    reply: FastifyReply)=>{
      const params = request.params as any
      const family = await familyService
        .getInfo(`${params['id']}`)
        .catch((err)=>reply.code(404).send({ err }))

      reply.send({ family })
  })
}
