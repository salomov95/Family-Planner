import { fastify } from 'fastify'
import { UserController } from '../domain/user'

const server = fastify()

server.register(UserController)

export { server }
