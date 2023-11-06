import { FastifyInstance } from "fastify";
import { prisma } from '../../lib/prisma';


export async function GetAllUsers(app: FastifyInstance){

  app.get('/user/getAllUsers', async (req, res) => {

    try {
      const allUsers = await prisma.user.findMany()

      console.log('Success when querying');

      return allUsers

    } catch (error) {
      console.log('Error when querying');
    }
  })
}