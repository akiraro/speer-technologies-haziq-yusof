const supertest = require('supertest')
const app = require('../../server')
const tweetService = require('../../src/services/tweet.service')
const dbService = require('../../src/services/db.service')

let userData1, userData2, tweetData, newTweetData

async function createUser(user) {
	const response = await supertest(app)
		.post('/user/register')
		.send(user)
}

async function loginUser(user) {
	const response = await supertest(app)
		.post('/user/login')
		.send(user)

	return response
}

beforeAll(async () => {
	userData1 = {
		username: "speeradmin1",
		password: "speerpassword1",
	}
	userData2 = {
		username: "speeradmin2",
		password: "speerpassword2"
	}
	tweetData = {
		text: "What a beautiful day !"
	}

	/** Create two test users */
	await createUser(userData1)
	await createUser(userData2)

	/** Store result */
	const userReq1 = await loginUser(userData1)
	const userReq2 = await loginUser(userData2)

	/** Store cookie to each user variable */
	userData1['Cookie'] = userReq1.get("Set-Cookie")
	userData2['Cookie'] = userReq2.get("Set-Cookie")
})

afterEach(() => {
	/** Reset mocks for every test suites */
	jest.restoreAllMocks();
});

afterAll(async () => {
	/** Clean up tweet and user table for my_test_db */
	await dbService.query(
		'DELETE from tweet;',
		[]
	)
	await dbService.query(
		'DELETE from user;',
		[]
	)
})


describe('POST /tweet', () => {
	it('creates a new tweet and returns 200', async () => {
		const response = await supertest(app)
			.post('/tweet')
			.set('Cookie', [userData1.Cookie])
			.send(tweetData)
		expect(response.status).toBe(200)
		expect(response.body.message).toBe("Tweet created successfully")
	})

	it('returns 400 when missing text in body request', async () => {
		const response = await supertest(app)
			.post('/tweet')
			.set('Cookie', [userData1.Cookie])
			.send({})
		expect(response.status).toBe(400)
		expect(response.body).toMatchObject({
			"errors": [{
				"msg": "Text is required",
				"param": "text",
				"location": "body"
			},
			{
				"msg": "Invalid value",
				"param": "text",
				"location": "body"
			},
			{
				"msg": "Text should be between 1 to 160 characters",
				"param": "text",
				"location": "body"
			}]
		})
	})

	it('returns 401 when no cookie is passed', async () => {
		const response = await supertest(app)
			.post('/tweet')
			.send(tweetData)
		expect(response.status).toBe(401)
		expect(response.text).toBe("Unauthorized")
	})

	it('handles error', async () => {
		jest.spyOn(tweetService, "createTweet").mockReturnValue(undefined)
		const response = await supertest(app)
			.post('/tweet')
			.set('Cookie', [userData1.Cookie])
			.send(tweetData)
		expect(response.status).toBe(500)
	})
})

describe('GET /tweet', () => {
	it('returns all new tweets associated to a user', async () => {
		const response = await supertest(app)
			.get('/tweet')
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(200)
		expect(response.body).toBeDefined()

		/** Store the newly created tweet for next test suites */
		newTweetData = response.body[0]
	})

	it('returns 401 when no cookie is passed', async () => {
		const response = await supertest(app)
			.get('/tweet')
		expect(response.status).toBe(401)
		expect(response.text).toBe("Unauthorized")
	})

})

describe('GET /tweet/:id', () => {
	it('returns tweet based on the id', async () => {
		const response = await supertest(app)
			.get('/tweet/' + newTweetData.tweet_id)
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(200)
		expect(response.body).toMatchObject(newTweetData)
	})

	it('returns 404 when tweet resource not found', async () => {
		const response = await supertest(app)
			.get('/tweet/0')
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(404)
		expect(response.text).toBe("Not found")
	})

	it('returns 401 when no cookie is passed', async () => {
		const response = await supertest(app)
			.get('/tweet/' + newTweetData.tweet_id)
		expect(response.status).toBe(401)
		expect(response.text).toBe("Unauthorized")
	})

	it('handles error', async () => {
		jest.spyOn(tweetService, "findOneTweet").mockReturnValue(undefined)
		const response = await supertest(app)
			.get('/tweet/0')
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(500)
	})
})

describe('PATCH /tweet/:id', () => {
	it('returns 200 when successfully update a tweet', async () => {
		const response = await supertest(app)
			.patch('/tweet/' + newTweetData.tweet_id)
			.send({ text: "Updated new tweet" })
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(200)
		expect(response.body.message).toBe("Tweet updated successfully")
	})

	it('returns 400 when missing text', async () => {
		const response = await supertest(app)
			.patch('/tweet/' + newTweetData.tweet_id)
			.set('Cookie', [userData1.Cookie])
			.send({})
		expect(response.status).toBe(400)
		expect(response.body).toMatchObject({
			"errors": [{
				"msg": "Text is required",
				"param": "text",
				"location": "body"
			},
			{
				"msg": "Invalid value",
				"param": "text",
				"location": "body"
			},
			{
				"msg": "Text should be between 1 to 160 characters",
				"param": "text",
				"location": "body"
			}]
		})
	})

	it('returns 403 when user access forbidden tweet resource', async () => {
		const response = await supertest(app)
			.patch('/tweet/' + newTweetData.tweet_id)
			.send({ text: "Updated new tweet" })
			.set('Cookie', [userData2.Cookie])
		expect(response.status).toBe(403)
		expect(response.text).toBe("403 Forbidden")
	})

	it('returns 400 when no resource was updated', async () => {
		jest.spyOn(tweetService, "updateOneTweet").mockReturnValue({affectedRows: 0})
		const response = await supertest(app)
			.patch('/tweet/' + newTweetData.tweet_id)
			.send({ text: "Updated new tweet" })
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(400)
		expect(response.body.message).toBe("Error in updating tweet")
	})

	it('returns 401 when no cookie is passed', async () => {
		const response = await supertest(app)
			.patch('/tweet/' + newTweetData.tweet_id)
			.send({ text: "Updated new tweet" })
		expect(response.status).toBe(401)
		expect(response.text).toBe("Unauthorized")
	})

	it('handles error', async () => {
		jest.spyOn(tweetService, "updateOneTweet").mockReturnValue(undefined)
		const response = await supertest(app)
			.patch('/tweet/' + newTweetData.tweet_id)
			.send({ text: "Updated new tweet" })
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(500)
	})
	
})

describe('DELETE /tweet/:id', () => {
	it('returns 403 when user access forbidden tweet resource', async () => {
		const response = await supertest(app)
			.delete('/tweet/' + newTweetData.tweet_id)
			.set('Cookie', [userData2.Cookie])
		expect(response.status).toBe(403)
		expect(response.text).toBe("403 Forbidden")
	})

	it('returns 200 when successfully delete a tweet', async () => {
		const response = await supertest(app)
			.delete('/tweet/' + newTweetData.tweet_id)
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(200)
		expect(response.body).toBeDefined()
	})

	it('returns 401 when no cookie is passed', async () => {
		const response = await supertest(app)
			.delete('/tweet/' + newTweetData.tweet_id)
		expect(response.status).toBe(401)
		expect(response.text).toBe("Unauthorized")
	})

	it('handles error', async () => {
		jest.spyOn(tweetService, "deleteOneTweet").mockReturnValue(undefined)
		const response = await supertest(app)
			.delete('/tweet/' + newTweetData.tweet_id)
			.set('Cookie', [userData1.Cookie])
		expect(response.status).toBe(500)
	})
})