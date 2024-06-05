# Usa una imagen base de Node.js
FROM node:18-bullseye-slim
# Desactiva la verificación de TLS
RUN npm config set strict-ssl false
# Establece el directorio de trabajo
WORKDIR /app

# Configura npm para usar HTTP en lugar de HTTPS
# Actualiza OpenSSL

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

