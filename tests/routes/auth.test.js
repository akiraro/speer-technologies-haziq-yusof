const supertest = require('supertest')
const app = require('../../server')
const authService = require('../../src/services/auth.service')
const bcrypt = require('bcrypt');

let userData

beforeEach(() => {
	userData = {
		username: "speeradmin",
		password: "speeerpassword123"
	}
})

afterEach(() => {
	jest.clearAllMocks();
});

describe('POST /user/register', () => {
	it('creates a new user', async () => {
		jest.spyOn(authService, "findUser").mockReturnValue(Promise.resolve([]))
		jest.spyOn(authService, "createUser").mockReturnValue(Promise.resolve({ message: "User registered successfully" }))

		const response = await supertest(app)
			.post('/user/register')
			.send(userData)
		expect(response.status).toBe(200)
		expect(response.body.message).toBe("User registered successfully")
	})

	it('returns error when there is duplicate username', async () => {
		jest.spyOn(authService, "findUser").mockReturnValue(Promise.resolve([userData]))

		const response = await supertest(app)
			.post('/user/register')
			.send(userData)
		expect(response.status).toBe(400)
		expect(response.body.error).toBe("Username is already exists")
	})

	it('returns 400 when failing at request input validation', async () => {
		userData = {
			username: "short",
			password: "pass"
		}

		const response = await supertest(app)
			.post('/user/register')
			.send(userData)
		expect(response.status).toBe(400)
		expect(response.body).toMatchObject({
			'errors': [{
				"location": "body",
				"msg": "Password should be between 6 to 20 characters",
				"param": "password",
				"value": "pass"
			}]
		})
	})

	it('handle error', async () => {
		jest.spyOn(authService, "findUser").mockReturnValue(undefined)

		const response = await supertest(app)
			.post('/user/register')
			.send(userData)
		expect(response.status).toBe(500)
	})
})


describe('POST /user/login', () => {
	it('returns 200 and header contains cookie with session ID', async () => {
		jest.spyOn(authService, "findUser").mockReturnValue(Promise.resolve([userData]))
		jest.spyOn(bcrypt, "compareSync").mockReturnValue(true)

		const response = await supertest(app)
			.post('/user/login')
			.send(userData)
		expect(response.status).toBe(200)
		expect(response.text).toBe("Logged in successfully")
		expect(response.get("Set-Cookie")).toBeDefined();
	})

	it('returns 400 when username or password entered incorrectly', async () => {
		jest.spyOn(authService, "findUser").mockReturnValue(Promise.resolve([]))

		const response = await supertest(app)
			.post('/user/login')
			.send(userData)
		expect(response.status).toBe(400)
		expect(response.body.error).toBe("Incorrect username or password")
	})
	
	it('returns 400 when failing at request input validation', async () => {
		userData = {
			username: "short",
			password: "pass"
		}

		const response = await supertest(app)
			.post('/user/login')
			.send(userData)
		expect(response.status).toBe(400)
		expect(response.body).toMatchObject({
			'errors': [{
				"location": "body",
				"msg": "Password should be between 6 to 20 characters",
				"param": "password",
				"value": "pass"
			}]
		})
	})

	it('handle error', async () => {
		jest.spyOn(authService, "findUser").mockReturnValue(undefined)

		const response = await supertest(app)
			.post('/user/login')
			.send(userData)
		expect(response.status).toBe(500)
	})
})

describe('POST /user/logout', () => {
	it('returns 200 and message', async () => {

		const response = await supertest(app)
			.post('/user/logout')

		expect(response.status).toBe(200)
		expect(response.text).toBe("Logged out successfully")
	})
})