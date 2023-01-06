DROP DATABASE IF EXISTS my_db;

CREATE DATABASE my_db;

USE my_db;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) DEFAULT NULL UNIQUE,
	password varchar(60),
  PRIMARY KEY (user_id)
);
