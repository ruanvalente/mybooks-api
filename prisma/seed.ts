import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

enum Status {
	READING = 'READING',
	PAUSED = 'PAUSED',
	COMPLETED = 'COMPLETED',
}

async function boostrap() {
	await prisma.books.create({
		data: {
			title: 'Orientação a Objetos Aprenda seus conceitos e suas aplicabilidades de forma efetiva',
			status: Status.READING,
			imageURL:
				'https://cdn.shopify.com/s/files/1/0155/7645/products/OrientacaoaObjetos_ebook_large.jpg?v=1631653034',
			resume:
				'Conforme a demanda por novos paradigmas que correspondessem às necessidades do dia a dia dos programadores, surgia a Orientação a Objetos, com a missão de cobrir as insuficiências do modelo estrutural. O Paradigma Orientado a Objeto tem como principal característica uma melhor e maior expressividade das nossas demandas e possibilita criar unidades de código mais próximas da forma como pensamos e agimos, facilitando o processo de transformação das necessidades diárias para uma linguagem orientada a objetos.',
		},
	})
}

boostrap()
