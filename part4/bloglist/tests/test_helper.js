const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  
  return users.map(u => {
    const user = u.toJSON()
    const userForToken = {
      username: user.username,
      id: user.id,
    }
    user.token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      { expiresIn: 60*60 }
    )
     return user
  })
}

module.exports = {
  blogsInDb, usersInDb
}