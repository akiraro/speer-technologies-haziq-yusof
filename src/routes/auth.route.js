const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const isAuthenticated = require('../middlewares/session.middleware')

/** User registration endpoint */
router.post('/register', authController.register)

/** User login endpoint */
router.post('/login', authController.login)

/** User login endpoint */
router.post('/logout', authController.logout)


module.exports = router