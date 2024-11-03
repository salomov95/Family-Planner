import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export async function Router(fastify: FastifyInstance) {
  fastify.get('/hello', async (request:FastifyRequest, reply: FastifyReply)=>{
    console.log(request.url)
    return reply.send({ 'hello': 'world' })
  })
}

