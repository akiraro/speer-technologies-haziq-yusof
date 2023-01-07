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
		'SELECT tweet_id, tweet_text, created_at, modified_at FROM tweet WHERE tweet_id = ? AND user_id = ?':
		'SELECT user_id, tweet_id, tweet_text, created_at, modified_at FROM tweet WHERE tweet_id = ?'

	const queryParams = userId ? 
		[tweetId, userId]:
		[tweetId]
	
	const result = await db.query(queryString,queryParams)

	return result
}

async function findAllTweet(userId){
	const result = await db.query(
		'SELECT tweet_id, tweet_text, created_at, modified_at FROM tweet WHERE user_id = ?',
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
	
	let message = 'Error in updating tweet'

	if (result.affectedRows){
		message = 'Tweet updated successfully'
	}

	return {message}
}

module.exports = {
	createTweet,
	findOneTweet,
	findAllTweet,
	updateOneTweet,
	deleteOneTweet
}