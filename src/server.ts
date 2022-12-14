import Fastify from 'fastify'
import cors from '@fastify/cors'
import { config } from 'dotenv'

config({ path: '.env' })

const PORT = process.env.NODE_ENV !== 'production' ? 3333 : process.env.PORT

import { booksRoutes } from './routes/books'

async function boostrap() {
	const fastify = Fastify({
		logger: true,
	})

	await fastify.register(cors, {
		origin: true,
	})

	await fastify.register(booksRoutes)

	await fastify.listen(PORT, '0.0.0.0')
}

boostrap()
