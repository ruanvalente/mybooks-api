import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'

export async function booksRoutes(fastify: FastifyInstance) {
	fastify.get('/books', async () => {
		const books = await prisma.books.findMany({
			orderBy: {
				title: 'desc',
			},
		})

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
			return reply.status(400).send({ message: 'You need to pass id of the book' })
		}

		if (!book) {
			return reply.status(404).send({ message: 'Book not found' })
		}

		return book
	})

	fastify.post('/books', async (request, reply) => {
		const createBookParams = z.object({
			title: z.string(),
			imageURL: z.string(),
		})

		const { title, imageURL } = createBookParams.parse(request.body)

		if (!title || !imageURL) {
			console.log('aqui')
			return reply.status(400).send({
				message: 'You need to pass title, status and imageURL of the book to register',
			})
		}

		const book = await prisma.books.create({
			data: {
				title,
				imageURL,
			},
		})

		if (!book) {
			return reply.status(500).send({ message: 'Error registering the book' })
		}

		return reply.status(201).send({ book })
	})

	fastify.put('/books/:id', async (request, reply) => {
		const bookId = z.object({
			id: z.string(),
		})

		const bookUpdateBody = z.object({
			title: z.string(),
			imageURL: z.string(),
		})

		const { id } = bookId.parse(request.params)
		const { title, imageURL } = bookUpdateBody.parse(request.body)

		const book = await prisma.books.findUnique({
			where: {
				id,
			},
		})

		if (!id) {
			return reply.status(400).send({ message: 'You need to pass id of the book' })
		}

		if (!book) {
			return reply.status(404).send({ message: 'Book not found' })
		}

		await prisma.books.updateMany({
			where: {
				id: book.id,
			},
			data: {
				title,
				imageURL,
			},
		})

		return reply.status(204).send()
	})

	fastify.delete('/books/:id', async (request, reply) => {
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
			return reply.status(400).send({ message: 'You need to pass id of the book' })
		}

		if (!book) {
			return reply.status(404).send({ message: 'Book not found' })
		}

		await prisma.books.delete({
			where: {
				id: book.id,
			},
		})

		return reply.status(200).send({ message: 'Book deleted successfully' })
	})
}
