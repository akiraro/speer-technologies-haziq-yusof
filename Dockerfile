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


FROM mysql:5.7

COPY initdb.sql /docker-entrypoint-initdb.d/initdb.sql

CMD [ "mysqld", "--init-file=/docker-entrypoint-initdb.d/initdb.sql" ]