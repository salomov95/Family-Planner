import { fastify } from 'fastify'
import { Router } from './routes'

const server = fastify()

server.register(Router)

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
