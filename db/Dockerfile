FROM mysql:5.7

COPY ./db/initdb.sql /docker-entrypoint-initdb.d/initdb.sql

CMD [ "mysqld", "--init-file=/docker-entrypoint-initdb.d/initdb.sql" ]