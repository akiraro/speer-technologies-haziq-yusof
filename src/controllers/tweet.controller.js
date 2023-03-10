const tweetService = require('../services/tweet.service')
const { validationResult } = require('express-validator')

async function create(req, res, next){
	try {
		/** Request payload validation */
		const validationErrors = validationResult(req)

		if (!validationErrors.isEmpty()){
			return res.status(400).json({errors: validationErrors.array()})
		}

		let tweetData = req.body
		tweetData['userId'] = req.session.user.user_id

		const queryResult = await tweetService.createTweet(tweetData)

		if (queryResult.affectedRows == 1){
			return res.json({message: "Tweet created successfully"})
		}
		
		return res.status(400).json({message: "Error when creating a tweet"})

	}
	catch (err){
		console.error("Error when creating a tweet", err.message);
		next(err)
	}
}

async function findOne(req, res, next){
	try {
		const tweetId = req.params.id
		const userId = req.session.user.user_id
		const result = await tweetService.findOneTweet(tweetId, userId)

		if (result.length == 0) {
			return res.status(404).send("Not found")
		}

		res.json(result[0])
	}
	catch (err){
		console.error("Error when fetching a tweet", err.message);
		next(err)
	}
}

async function findAll(req, res, next){
	try {
		const userId = req.session.user.user_id
		
		res.json(await tweetService.findAllTweet(userId))
	}
	catch (err){
		console.error("Error when fetching all tweets", err.message);
		next(err)
	}
}

async function updateOne(req, res, next){
	try {
		/** Request payload validation */
		const validationErrors = validationResult(req)

		if (!validationErrors.isEmpty()){
			return res.status(400).json({errors: validationErrors.array()})
		}
		const tweetId = req.params.id
		const userId = req.session.user.user_id

		/** Find tweet resource and make sure the user have permission to accesss the resource */
		const tweetResult = await tweetService.findOneTweet(tweetId, null)

		if (tweetResult.length == 1 && tweetResult[0].user_id !== userId){
			return res.status(403).send("403 Forbidden")
		}

		let tweetData = req.body
		tweetData['userId'] = userId
		tweetData['tweetId'] = tweetId

		const queryResult = await tweetService.updateOneTweet(tweetData)

		if (queryResult.affectedRows === 1){
			return res.json({message: "Tweet updated successfully"})
		}
		
		return res.status(400).json({message: "Error in updating tweet"})

	}
	catch (err){
		console.error("Error when updating a tweet", err.message);
		next(err)
	}
}
async function deleteOne(req, res, next){
	try {
		const tweetId = req.params.id
		const userId = req.session.user.user_id

		/** Find tweet resource and make sure the user have permission to accesss the resource */
		const tweetResult = await tweetService.findOneTweet(tweetId, null)

		if (tweetResult.length == 1 && tweetResult[0].user_id !== userId){
			return res.status(403).send("403 Forbidden")
		}

		const deleteResult = await tweetService.deleteOneTweet(tweetId, userId)

		if (deleteResult.affectedRows === 1){
			return res.status(200).json({message: "Tweet deleted successfully"})
		}

		return res.status(400).json({message: "Error in deleting tweet"})
	}
	catch (err){
		console.error("Error when deleting a tweet", err.message);
		next(err)
	}
}

async function createRetweet(req, res, next){
	try {
		const tweetId = req.params.id
		const userId = req.session.user.user_id

		/** Make sure parent tweet exists */
		const tweetResult = await tweetService.findOneTweet(tweetId, null)

		if (tweetResult.length === 0){
			return res.status(404).send("Not found")
		}

		let tweetData = req.body
		tweetData['parentId'] = tweetId
		tweetData['userId'] = userId

		const retweetResult = await tweetService.createTweetThread(tweetData, true)

		if (retweetResult.affectedRows === 1){
			return res.json({message: "Retweet created successfully"})
		}
		
		return res.status(400).json({message: "Error when creating a Retweet"})

	}
	catch (err){
		console.error("Error when creating a retweet", err.message);
		next(err)
	}
}

async function createTweetThread(req, res, next){
	try {
		const tweetId = req.params.id
		const userId = req.session.user.user_id

		/** Make sure parent tweet exists */
		const tweetResult = await tweetService.findOneTweet(tweetId, null)

		if (tweetResult.length === 0){
			return res.status(404).send("Not found")
		}
		
		let tweetData = req.body
		tweetData['parentId'] = tweetId
		tweetData['userId'] = userId

		const retweetResult = await tweetService.createTweetThread(tweetData, false)

		if (retweetResult.affectedRows === 1){
			return res.json({message: "Tweet thread created successfully"})
		}
		
		return res.status(400).json({message: "Error when creating a Retweet"})

	}
	catch (err){
		console.error("Error when creating a retweet", err.message);
		next(err)
	}
}

async function likeTweet(req, res, next){
	try {
		const tweetId = req.params.id
		const userId = req.session.user.user_id

		let tweetData = {}
		tweetData['tweetId'] = tweetId
		tweetData['userId'] = userId

		/** Check if user already like the tweet or not */
		const findTweetLikeResult = await tweetService.findTweetLike(tweetData)

		if (findTweetLikeResult.length !== 0){
			return res.json({message: "Tweet like created successfully"})
		}

		/** If user have not like the tweet, then create a new tweet_like record */
		const likeResult = await tweetService.createTweetLike(tweetData)

		if (likeResult.affectedRows === 1){
			return res.json({message: "Tweet like created successfully"})
		}
		
		return res.status(400).json({message: "Error when creating a Tweet Like"})

	}
	catch (err){
		console.error("Error when creating a Tweet Like", err.message);
		next(err)
	}
}

async function unlikeTweet(req, res, next){
	try {
		const tweetId = req.params.id
		const userId = req.session.user.user_id

		let tweetData = {}
		tweetData['tweetId'] = tweetId
		tweetData['userId'] = userId

		const likeResult = await tweetService.deleteTweetLike(tweetData)

		if (likeResult.affectedRows === 1){
			return res.json({message: "Tweet like deleted successfully"})
		}
		
		return res.status(400).json({message: "Error when deleting a Tweet Like"})

	}
	catch (err){
		console.error("Error when deleting a Tweet Like", err.message);
		next(err)
	}
}

module.exports = {
	create,
	findOne,
	findAll,
	updateOne,
	deleteOne,
	createRetweet,
	createTweetThread,
	likeTweet,
	unlikeTweet
}