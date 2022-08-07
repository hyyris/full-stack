import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'title',
  author: 'author',
  url: 'www.google.com',
  likes: 100
}

// 5.13
test('5.13 renders content correctly', () => {
  render(<Blog blog={blog} />)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()
  const hiddenElement = screen.getByText(`${blog.url}`).parentElement
  expect(hiddenElement).not.toBeVisible()
})

// 5.14
test('5.14 clicking the button makes the hidden content visible', async () => {

  render(
    <Blog blog={blog} />
  )
  const hiddenElement = screen.getByText(`${blog.url}`).parentElement
  expect(hiddenElement).not.toBeVisible()
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(hiddenElement).toBeVisible()
})

// 5.15
test('5.15 like button clicked twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton) // make like button visible
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
