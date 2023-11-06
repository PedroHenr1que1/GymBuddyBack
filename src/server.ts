import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import fastifyAuth from 'fastify-auth';
import fastifyJWT from 'fastify-jwt';
import fastifyBcrypt from 'fastify-bcrypt';

import { HealthCheck } from './routes/health/health';
import { CreateNewUser } from './routes/user/createNewUser';
import { GetAllUsers } from './routes/user/getAllUsers';

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})
app.register(fastifyJWT, { secret: "secretKey"})
app.register(fastifyBcrypt)

//# ROUTES
app.register(HealthCheck)
app.register(CreateNewUser)
app.register(GetAllUsers)

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP server running on port 3333')
})