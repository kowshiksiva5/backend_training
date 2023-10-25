const users = [
    {id: 1, name: 'Alice', location: 'New York', following: [2]},
    {id: 2, name: 'Bob', location: 'California', following: []},
]

const tweets = [
    {id: 1, userId: 2, message: 'Hello, world!', timestamp: new Date()},
    {id: 2, userId: 1, message: 'My first tweet!', timestamp: new Date()},
]

function follow(userId, followId) {
    const user = users.find(u => u.id === userId)
    if (!user.following.includes(followId)) {
        user.following.push(followId)
        console.log(`${user.name} is now following user ${followId}`)
    }
}

function unfollow(userId, unfollowId) {
    const user = users.find(u => u.id === userId)
    user.following = user.following.filter(id => id !== unfollowId)
    console.log(`${user.name} unfollowed user ${unfollowId}`)
}

function postTweet(userId, message) {
    const tweet = {
        id: tweets.length + 1,
        userId,
        message,
        timestamp: new Date(),
    }
    tweets.push(tweet)
    console.log('Tweet posted:', tweet)
}

function getFriendTweetsAtLocation(userId, location) {
    const user = users.find(u => u.id === userId)
    const friendTweets = tweets.filter(t => 
        user.following.includes(t.userId) && user.location === location
        // users.find(u => u.id === t.userId).location === location
    )
    console.log('Friend tweets from location', location, friendTweets)
    return friendTweets
}

postTweet(2, 'This is my first tweet!')

follow(1, 2)

getFriendTweetsAtLocation(1, 'California')
