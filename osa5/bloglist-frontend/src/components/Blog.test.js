import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container


beforeEach(() => {
  const blog = {
    title: 'Testing is fun',
    author: 'Ronja Pahaoja',
    url: 'http://pahaoja.fi',
    likes: 12,
    user: {
      username: 'Pahis',
      name: 'Ronja'
    }
  }
  
  container = render(
    <Blog blog={blog} />
  ).container
})

test('renders title and author', () => {
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Testing is fun Ronja Pahaoja')
})

test('by default the blog meta info has not rendered', () => {
  const blogMeta = container.querySelector('.blog-meta')
  expect(blogMeta).toBeNull()
})

test('after clicking the button, all info are rendered', async () => {
  const user = userEvent.setup()
  const button = screen.getByRole('button', {name: /testing is fun/i})
  await user.click(button)

  const blogMeta = container.querySelector('.blog-meta')
  expect(blogMeta).not.toHaveStyle('display: none')
  expect(blogMeta).toHaveTextContent('Likes')
  expect(blogMeta).toHaveTextContent('http://pahaoja.fi')
})

test('like button clicked twice', async () => {
  const blog = {
    title: 'Mock to handle clicking',
    author: 'Ronja Pahaoja',
    url: 'http://pahaoja.fi',
    likes: 3,
    user: {
      username: 'Pahis',
      name: 'Ronja'
    }
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} like={mockHandler} />)

  const user = userEvent.setup()
  await user.click(screen.getByText(/mock to handle clicking/i))

  const button = screen.getByRole('button', { name: /like/i })
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})