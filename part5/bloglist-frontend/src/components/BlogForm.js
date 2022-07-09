import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <form onSubmit={createBlog}>
        <span>Title: </span>
        <input
          placeholder='Title of the blog'
          value={newTitle}
          onChange={handleTitleChange}
        /><br />
        <span>Author: </span>
        <input
          placeholder='Author of the blog'
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br />
        <span>Url: </span>
        <input
          placeholder='Url of the blog'
          value={newUrl}
          onChange={handleUrlChange}
        /><br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm