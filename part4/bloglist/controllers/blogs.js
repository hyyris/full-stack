const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  blog.user = request.user._id

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'invalid user' })
  }
  blog.delete()
  response.status(204).end()
})

blogsRouter.put('/:id', /*middleware.userExtractor,*/ async (request, response) => {
  //const user = request.user
  const blog = await Blog.findById(request.params.id)
  /*if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'invalid user' })
  }*/
  const body = request.body

  blog.title = body.title
  blog.author = body.author
  blog.url = body.url
  blog.likes = body.likes

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter