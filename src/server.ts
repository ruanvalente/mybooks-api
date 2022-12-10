import Fastify from "fastify";
import cors from "@fastify/cors";
import { booksRoutes } from "./routes/books";

async function boostrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(booksRoutes);

  await fastify.listen({ port: 3333 });
}

boostrap();
