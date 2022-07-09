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
          value={newTitle}
          onChange={handleTitleChange}
        /><br />
        <span>Author: </span>
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br />
        <span>Url: </span>
        <input
          value={newUrl}
          onChange={handleUrlChange}
        /><br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm