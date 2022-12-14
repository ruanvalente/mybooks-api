FROM node:latest as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY prisma* ./
COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
	&& npm prune --production

# ---

FROM node:latest

ENV NODE_ENV production
EXPOSE 8080

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/build/ ./build/

CMD ["node", "build/server.js"]
