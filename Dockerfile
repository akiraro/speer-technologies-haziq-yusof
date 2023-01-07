FROM node:14.20.1

# set working directory
WORKDIR /app/backend

# install app dependencies
COPY package.json ./
RUN npm install

COPY . ./

EXPOSE 3000

# start app
CMD ["node", "server.js"]