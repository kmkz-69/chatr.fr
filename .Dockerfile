FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN yarn upgrade
COPY . . /
RUN yarn install
CMD ["yarn", "start"]