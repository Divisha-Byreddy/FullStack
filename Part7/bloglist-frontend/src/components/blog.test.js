import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title : 'Ikigai',
    author : 'Hector',
    url : 'ikigai.com',
    likes : 7
  }

  const component = render(
    <Blog  blog = {blog} />
  )
  expect(component.container).toHaveTextContent('Ikigai')
  expect(component.container).toHaveTextContent('Hector')
  expect(component.container).not.toHaveTextContent('ikigai.com')
  expect(component.container).not.toHaveTextContent(7)
})

test('renders content on clicking view button', () => {
  const blog = {
    title : 'Ikigai',
    author : 'Hector',
    url : 'ikigai.com',
    likes : 7
  }

  const component = render(
    <Blog  blog = {blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Ikigai')
  expect(component.container).toHaveTextContent('Hector')
  expect(component.container).toHaveTextContent('ikigai.com')
  expect(component.container).toHaveTextContent(7)
})

test('clicking the like button calls respective event handler', () => {
  const blog = {
    title : 'Ikigai',
    author : 'Hector',
    url : 'ikigai.com',
    likes : 7
  }

  const incrementVote = jest.fn()

  const component = render(
    <Blog  blog = {blog} incrementVote = {incrementVote}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(incrementVote.mock.calls).toHaveLength(2)
})