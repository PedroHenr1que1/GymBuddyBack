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
      const existingUser = await prisma.user.findFirst({
        where: { email: email }
      })
      if(!existingUser){
        res.status(404).send({message: "User not found"})
        return
      }

      const passwordMatch = await app.bcrypt.compare(password, existingUser.password)

      const user = {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email
      }

      if(passwordMatch){
        res.status(200).send({
          message: "User Authenticated",
          Object: user
        })
      } else {
        res.status(404).send({message: "Authentication Failed"})
      }

      console.log('User login success');
    } catch (error) {
      console.error('User login error:', error);

    }

  })
}