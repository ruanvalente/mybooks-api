import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'

export async function booksRoutes(fastify: FastifyInstance) {
	fastify.get('/books', async () => {
		const books = await prisma.books.findMany()

		return books
	})

	fastify.get('/books/:id', async (request, reply) => {
		const bookId = z.object({
			id: z.string(),
		})

		const { id } = bookId.parse(request.params)

		const book = await prisma.books.findUnique({
			where: {
				id,
			},
		})

		if (!id) {
			return reply
				.status(400)
				.send({ message: 'You need to pass id of the book' })
		}

		if (!book) {
			return reply.status(404).send({ message: 'Book not found' })
		}

		return book
	})
}
