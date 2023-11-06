import { FastifyInstance } from "fastify";
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export async function LoginUser(app: FastifyInstance){
  const Schema = z

  //Schema do body da requisição
  const BodySchema = Schema.object({
    email: Schema.string().min(1).email(),
    password: Schema.string().min(1),
  })

  app.post('/user/login', async (req, res) => {
    const {email, password} = BodySchema.parse(req.body)

    try {
      const ExistingUser = await prisma.user.findFirst({
        where: { email: email }
      })
      if(!ExistingUser){
        res.status(404).send({message: "User not found"})
        return
      }

      if(ExistingUser.password === password){
        res.status(200).send({
          message: "User Authenticated",
          Object: ExistingUser
        })
      } else {
        res.status(404).send({message: "Wrong password"})
      }

      console.log('User login success');
    } catch (error) {
      console.error('User login error:', error);

    }

  })
}