const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const isAuthenticated = require('../middlewares/session.middleware')
const { userDataValidate } = require('../validations/auth.validation')

/** User registration endpoint */
router.post('/register', userDataValidate, authController.register)

/** User login endpoint */
router.post('/login', userDataValidate, authController.login)

/** User login endpoint */
router.post('/logout', authController.logout)


module.exports = router