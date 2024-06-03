# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Instala Next.js globalmente
RUN npm install -g next

# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando para correr la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]

