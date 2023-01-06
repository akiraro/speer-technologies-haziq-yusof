const supertest = require('supertest')
const app = require('./server')

describe('Server up and running', () => {
	it('returns 200 with message', async () => {
		const response = await supertest(app).get('/')
		expect(response.status).toBe(200)
		expect(response.body.message).toBe("ok")
	})
})