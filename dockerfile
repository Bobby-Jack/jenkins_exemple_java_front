# Stage 1 : Construction de l'application Angular
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Construire l'application en mode production
RUN npm run build --configuration=production

# Stage 2 : Sertir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers de build depuis le stage précédent
COPY --from=build /app/dist/your-angular-app-name /usr/share/nginx/html

# Exposer le port 80 (par défaut pour Nginx)
EXPOSE 80

# Démarrer Nginx en mode daemon off
CMD ["nginx", "-g", "daemon off;"]   