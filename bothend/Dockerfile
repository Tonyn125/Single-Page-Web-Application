FROM node:alpine
CMD ["npm", "run", "start"]
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json /app/package.json
RUN rm -rf node_modules && npm install
COPY . /app
RUN npm run build
