## Back End Assessment for Full Stack Developer Position @ Speer Technologies
# Requirements

- Node >= 14
- Express >= 4
- Docker

# Installation & Setup

 - Run using docker compose
	
	Docker-compose.yml and Dockerfile was set up
    ```
	docker-compose up
    ```

# Testing
To run the test, run the following
`npm run test`

# Usage
This repo contains all tasks for the backend assessment until section 3


## Authentication Endpoints (Section 1)
### User Registration
**Method/URL**

 `POST` _/user/register_

**Data**
```json
{
    "username": "[valid email address]",
    "password": "[password in plain text]"
}
```

### User Login
**Method/URL**

 `POST` _/user/login_

**Data**
```json
{
    "username": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Response**

['Set-Cookie'] in header for session

## Tweet CRUD Endpoints (Section 2)
### Create Tweet
**Method/URL**

 `POST` _/tweet_

 `Header['Cookie']` = [Cookie from login]

**Data**
```json
{
    "text": "[plain text 1 to 160 characters]",
}
```

### Get Tweet
**Method/URL**

 `GET` _/tweet/:id_

 `Header['Cookie']` = [Cookie from login]

**Param ID**

Optional
`id=[integer]`

### Update Tweet
**Method/URL**

 `PATCH` _/tweet/:id_

 `Header['Cookie']` = [Cookie from login]

**Param ID**

Required
`id=[integer]`

**Data**
```json
{
    "text": "[plain text 1 to 160 characters]",
}
```

### Delete Tweet
**Method/URL**

 `DELETE` _/tweet/:id_

 `Header['Cookie']` = [Cookie from login]

**Param ID**

Required
`id=[integer]`



## Retweet, Like/Unlike, Threading Endpoints (Section 3)

### Create Retweet
**Method/URL**

 `POST` _/tweet/:id/retweet_

 `Header['Cookie']` = [Cookie from login]

**Data**
```json
{
    "text": "[plain text 1 to 160 characters]",
}
```
**Param ID**

Required
`id=[integer]`

### Create Thread
**Method/URL**

 `POST` _/tweet/:id_

 `Header['Cookie']` = [Cookie from login]

**Data**
```json
{
    "text": "[plain text 1 to 160 characters]",
}
```
**Param ID**

Required
`id=[integer]`

### Like Tweet
**Method/URL**

 `POST` _/tweet/:id/like_

 `Header['Cookie']` = [Cookie from login]

Required
`id=[integer]`

### Unlike Tweet
**Method/URL**

 `POST` _/tweet/:id/unlike_

 `Header['Cookie']` = [Cookie from login]

Required
`id=[integer]`



# Appreciation
Thank you Speer Technologies for this opportunity to showcase my skill and experience. I believe there is still a lot of room for improvement and due to time constraints, this is the best I could do.

I have a lot of task and plan that I would like to improve but unable to do it. Please check all the Git issues to see all my issues, bugs, features and improvements

# Author
By Haziq Yusof
http://github.com/akiraro


