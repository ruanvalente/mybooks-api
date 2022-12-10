import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma'

export async function booksRoutes(fastify: FastifyInstance) {
	fastify.get('/books', async () => {
		const books = await prisma.books.findMany()

		return books
	})
}
