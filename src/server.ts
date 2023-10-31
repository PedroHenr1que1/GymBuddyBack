import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

import { HealthCheck } from './routes/health/health';

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(HealthCheck)

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP server running on port 3333')
})