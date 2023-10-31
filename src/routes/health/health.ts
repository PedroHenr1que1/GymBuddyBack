import { FastifyInstance } from "fastify";

export async function HealthCheck (app: FastifyInstance) {
  app.get('/health', async (req, res) => {

    if(res.statusCode === 200) {
      res.send({
        message: "Tudo ok!"
      })
    } else {
      res.send({
        message: "Há algo de errado!"
      })
    }
  })
}