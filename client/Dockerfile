FROM node:16.13 AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN yarn install

COPY . /usr/src/app
RUN yarn build


FROM nginx:1.21
RUN rm -rf /etc/nginx/conf.d/
COPY conf.d/ /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/build /usr/share/nginx/html