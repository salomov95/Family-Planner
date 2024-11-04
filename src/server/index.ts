import { fastify } from 'fastify'
import { FamilyController } from '../domain/family/index.ts'

const server = fastify()

server.register(FamilyController)

export { server }
