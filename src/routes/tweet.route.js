const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweet.controller')
const isAuthenticated = require('../middlewares/session.middleware')
const { tweetDataValidate } = require('../validations/tweet.validation')

/** Create tweet endpoint */
router.post('/tweet', isAuthenticated, tweetDataValidate, tweetController.create)

/** Get multiple tweet resource endpoint */
router.get('/tweet/', isAuthenticated, tweetController.findAll)

/** Get single tweet resource endpoint */
router.get('/tweet/:id', isAuthenticated, tweetController.findOne)

/** Update single tweet resource endpoint */
router.patch('/tweet/:id', isAuthenticated, tweetDataValidate, tweetController.updateOne)

/** Delete single tweet resource endpoint */
router.delete('/tweet/:id', isAuthenticated, tweetController.deleteOne)

/** Create tweet thread resource endpoint */
router.post('/tweet/:id', isAuthenticated, tweetDataValidate, tweetController.createTweetThread)

/** Create retweet resource endpoint */
router.post('/tweet/:id/retweet', isAuthenticated, tweetDataValidate, tweetController.createRetweet)

/** Like tweet endpoint */
router.post('/tweet/:id/like', isAuthenticated, tweetController.likeTweet)

/** Unlike tweet endpoint */
router.post('/tweet/:id/unlike', isAuthenticated, tweetController.unlikeTweet)

module.exports = router