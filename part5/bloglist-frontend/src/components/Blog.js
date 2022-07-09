import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const update = () => {
    const updatedBlog = {}
    Object.assign(updatedBlog, blog)
    updatedBlog.likes += 1
    updatedBlog.user = blog.user?.id
    updateBlog(updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick={() => update()}>like</button>
          </div>
          <div>
            {blog?.user?.name ? blog.user.name : blog?.user?.username}
          </div>
          {user.username === blog.user?.username ? <button onClick={() => remove()}>remove</button> : <></>}
        </div>
      </div>
    </div>
  )
}

export default Blog