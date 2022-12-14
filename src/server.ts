import Fastify from 'fastify'
import cors from '@fastify/cors'
import { config } from 'dotenv'

config({ path: '.env' })

import { booksRoutes } from './routes/books'

async function boostrap() {
	const fastify = Fastify({
		logger: true,
	})

	await fastify.register(cors, {
		origin: true,
	})

	await fastify.register(booksRoutes)

	await fastify.listen(8080, '0.0.0.0')
}

boostrap()
