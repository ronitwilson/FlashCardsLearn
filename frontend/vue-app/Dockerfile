# Frontend Dockerfile (Vite build + static serve)
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install
COPY tsconfig.json ./
COPY index.html ./
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
# Copy a basic nginx config to handle SPA fallback
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
