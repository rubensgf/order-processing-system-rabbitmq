FROM node:18-slim

WORKDIR /app

# Instala dependências do sistema (incluindo OpenSSL)
RUN apt-get update -y && apt-get install -y openssl

# Copia package.json e instala dependências do Node
COPY package*.json ./
RUN npm install

# Copia todo o código da API
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Comando de inicialização
CMD ["npm", "start"]
