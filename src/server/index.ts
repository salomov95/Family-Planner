import { fastify } from 'fastify'
import { fastifyCookie, FastifyCookieOptions } from '@fastify/cookie'
import { UserController } from '../domain/user'

const server = fastify()

server.register(fastifyCookie, {
  httpOnly: true,
  maxAge: (3 * 24 * 60 * 60)
} as FastifyCookieOptions)

server.register(UserController)

export { server }
