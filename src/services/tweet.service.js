const db = require('./db.service')

async function createTweet(tweetData){
	const result = await db.query(
		'INSERT INTO tweet (user_id, tweet_text) VALUES (?, ?)',
		[tweetData.userId, tweetData.text]
	)

	return result
}

/** 
 * Find tweet resource from db
 * 
 * The function support making query to either fetch only tweet resource related to userId, or any tweet with tweetId
 */
async function findOneTweet(tweetId, userId){
	const queryString = userId ? 
		'SELECT tweet_id, tweet_text, parent_id, is_retweet, created_at, modified_at FROM tweet WHERE tweet_id = ? AND user_id = ?':
		'SELECT user_id, tweet_id, tweet_text, created_at, modified_at FROM tweet WHERE tweet_id = ?'

	const queryParams = userId ? 
		[tweetId, userId]:
		[tweetId]
	
	const result = await db.query(queryString,queryParams)

	return result
}

async function findAllTweet(userId){
	const result = await db.query(
		'SELECT tweet_id, tweet_text, parent_id, is_retweet, created_at, modified_at FROM tweet WHERE user_id = ?',
		[userId]
	)

	return result
}

async function deleteOneTweet(tweetId, userId){
	const result = await db.query(
		'DELETE FROM tweet WHERE tweet_id = ? and user_id = ?',
		[tweetId, userId]
	)

	return result
}

async function updateOneTweet(tweetData){

	const result = await db.query(
		'UPDATE tweet SET tweet_text = ?, modified_at = CURRENT_TIMESTAMP WHERE tweet_id = ? and user_id = ?',
		[tweetData.text, tweetData.tweetId, tweetData.userId]
	)
	
	return result 
}

async function createTweetThread(tweetData, isRetweet){

	const result = await db.query(
		'INSERT INTO tweet (user_id, parent_id, tweet_text, is_retweet) VALUES (?, ?, ?, ?)',
		[tweetData.userId, tweetData.parentId, tweetData.text, isRetweet ? 1:0]
	)
	
	return result 
}

async function findTweetLike(tweetData){
	const result = await db.query(
		'SELECT * FROM tweet_like WHERE user_id = ? AND tweet_id = ?',
		[tweetData.userId, tweetData.tweetId]
	)

	return result
}

async function createTweetLike(tweetData){

	const result = await db.query(
		'INSERT INTO tweet_like (user_id, tweet_id) VALUES (?, ?)',
		[tweetData.userId, tweetData.tweetId]
	)
	
	return result 
}

async function deleteTweetLike(tweetData){

	const result = await db.query(
		'DELETE FROM tweet_like WHERE tweet_id = ? and user_id = ?',
		[tweetData.tweetId, tweetData.userId]
	)
	
	return result 
}

module.exports = {
	createTweet,
	findOneTweet,
	findAllTweet,
	updateOneTweet,
	deleteOneTweet,
	createTweetThread,
	createTweetLike,
	deleteTweetLike,
	findTweetLike
}