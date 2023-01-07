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


DROP TABLE IF EXISTS tweet;

CREATE TABLE tweet (
  tweet_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  tweet_text varchar(160) NOT NULL,
  modified_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);


DROP DATABASE IF EXISTS my_test_db;

CREATE DATABASE my_test_db;

USE my_test_db;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) DEFAULT NULL UNIQUE,
	password varchar(60),
  PRIMARY KEY (user_id)
);


DROP TABLE IF EXISTS tweet;

CREATE TABLE tweet (
  tweet_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  tweet_text varchar(160) NOT NULL,
  modified_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);
