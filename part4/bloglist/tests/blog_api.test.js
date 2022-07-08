const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('check initial data', () => {
  // 4.8
  test('4.8 there are two blogs and the type is json', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  // 4.9
  test('4.9 blogs have id\'s defined', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('add data', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const blogs = await helper.blogsInDb()
    await Blog.deleteMany({})
    for (let blog of blogs) {
      blog.user = savedUser._id
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  // 4.10
  test('4.10 new blog is added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: "Tester",
      url: "http://www.google.com",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + usersAtStart[0].token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain(
      'async/await simplifies making async calls'
    )
  })

  // 4.11
  test('4.11 likes default to 0', async () => {
    const usersAtStart = await helper.usersInDb()
    const newBlog = {
      title: 'missing likes',
      author: "Tester",
      url: "http://www.google.com",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + usersAtStart[0].token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const likes = response.body.map(blog => blog.likes)

    expect(likes).toContain(0)
  })

  // 4.12
  test('4.12 missing title and url gives an error', async () => {
    const usersAtStart = await helper.usersInDb()
    const newBlog = {
      author: "Tester",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + usersAtStart[0].token)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })
  // 4.23
  test('4.23 fail to add a new blog', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: "Tester",
      url: "http://www.google.com",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const blogs = await helper.blogsInDb()
    await Blog.deleteMany({})
    for (let blog of blogs) {
      blog.user = savedUser._id
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  //4.13
  test('4.13 succeeds with status code 204 if id is valid', async () => {
    const usersAtStart = await helper.usersInDb()
    const initialResponse = await api.get('/api/blogs')
    const blogToDelete = initialResponse.body[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + usersAtStart[0].token)
      .expect(204)

    const afterResponse = await api.get('/api/blogs')

    expect(afterResponse.body).toHaveLength(
      initialBlogs.length - 1
    )

    const titles = afterResponse.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating of a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const blogs = await helper.blogsInDb()
    await Blog.deleteMany({})
    for (let blog of blogs) {
      blog.user = savedUser._id
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  //4.14
  test('4.14 succesfully updates likes of a blog', async () => {
    const usersAtStart = await helper.usersInDb()
    const initialResponse = await api.get('/api/blogs')
    const blogToUpdate = initialResponse.body[0]
    const updatedLikes = blogToUpdate.likes + 1
    blogToUpdate.likes = updatedLikes

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('Authorization', 'bearer ' + usersAtStart[0].token)

    const afterResponse = await api.get('/api/blogs')

    expect(afterResponse.body[0].likes).toBe(updatedLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})