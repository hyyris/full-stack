import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// 5.16
test('5.16 create a blog calls event handler with right details', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()
  const testTitle = 'Test title'
  const testAuthor = 'Author A. Authoritarian'

  render(
    <BlogForm addBlog={mockHandler} />
  )

  const inputTitle = screen.getByPlaceholderText('Title of the blog')
  await user.type(inputTitle, testTitle)
  const inputAuthor = screen.getByPlaceholderText('Author of the blog')
  await user.type(inputAuthor, testAuthor)


  const likeButton = screen.getByText('create')
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(testTitle)
  expect(mockHandler.mock.calls[0][0].author).toBe(testAuthor)
})
