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
  parent_id int(11),
  tweet_text varchar(160) NOT NULL,
  is_retweet BOOLEAN DEFAULT 0,
  modified_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (parent_id) REFERENCES tweet(tweet_id)
);

DROP TABLE IF EXISTS tweet_like;

CREATE TABLE tweet_like (
  tweet_like_id int(11) NOT NULL AUTO_INCREMENT,
  tweet_id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_like_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id)
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
  parent_id int(11),
  tweet_text varchar(160) NOT NULL,
  is_retweet BOOLEAN DEFAULT 0,
  modified_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (parent_id) REFERENCES tweet(tweet_id)
);
