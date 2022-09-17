FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY cli.js ./cli.js

# Install app dependencies
RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:16-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/cli.js ./cli.js

EXPOSE 3000
CMD [ "npm", "i", "prisma" ]
CMD [ "npm", "run", "start:migrate:prod" ]