import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('creates a new blog with right details', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog = { createBlog }/>
  )
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title , {
    target : { value : 'Ikigai' }
  })
  fireEvent.change(author , {
    target : { value : 'Hector' }
  })
  fireEvent.change(url , {
    target : { value : 'ikigai.com' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Ikigai')
  expect(createBlog.mock.calls[0][0].author).toBe('Hector')
  expect(createBlog.mock.calls[0][0].url).toBe('ikigai.com')
})