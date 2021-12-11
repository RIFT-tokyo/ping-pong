FROM node:16.13 AS builder
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

# FROM node:16.13
# WORKDIR /app

# COPY --from=builder /app/dist /app/
# ENV NODE_ENV=production
EXPOSE 5000 4000
CMD ["node", "./dist/main.js"]