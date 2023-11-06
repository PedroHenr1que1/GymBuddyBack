import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';

export async function CreateNewUser (app: FastifyInstance){
  const Schema = z

  //Schema do body da requisição
  const BodySchema = Schema.object({
    firstName: Schema.string().min(1),
    lastName: Schema.string().min(1),
    password: Schema.string().min(1),
    email: Schema.string().min(1).email(),
  })

  app.post('/user/create', async (req, res) => {
    const { firstName, lastName, password, email } = BodySchema.parse(req.body)

    try {
      const ExistingUser = await prisma.user.findFirst({
        where: { email : email}
      })
      if(ExistingUser){
        res.status(200).send({message: "Usuário já cadastrado"})
        return
      }

      const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }
      })
      
      console.log('New user created');

      return {
        message: 'New user created',
        object: user,
      } 

    } catch (error) {
      console.error('Error creating user:', error);
    }
    
  })
}