import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calback function get right values on parameter', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm create={createBlog} />)
  
  const inputTitle = screen.getByLabelText(/title/i)
  await user.type(inputTitle, 'Testing is fun')
  const inputAuthor = screen.getByLabelText(/author/i)
  await user.type(inputAuthor, 'Ronja Pahaoja')
  
  const inputUrl = screen.getByLabelText(/url/i)
  await user.type(inputUrl, 'http://pahaoja.fi')
  
  const sendButton = screen.getByRole('button', { name: 'Add' })
  await user.click(sendButton)
  
  expect(createBlog.mock.calls).toHaveLength(1)
  const param = createBlog.mock.calls[0][0]
  expect(param.title).toBe('Testing is fun')
  expect(param.author).toBe('Ronja Pahaoja')
  expect(param.url).toBe('http://pahaoja.fi')
  
})