const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]
const listWithMultipleBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 5,
    __v: 0
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0
  },
  {
    id: '5a422a851b54a676234d17g6',
    title: 'React patterns 123',
    author: 'Michael Chan',
    url: 'https://reactpatterns123.com/',
    likes: 3,
    __v: 0
  }
]

describe('total likes', () =>{
  test('of empty list is',() =>{
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only blog is', () =>{
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(12)
  })
  test('when list has multiple blogs is',() =>{
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(15)
  })
})

describe('favorite blog',() =>{
  test('of empty list is',() =>{
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(0)
  })
  test('when list has only one blog', () =>{
    var result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('when list has multiple blogs is', () =>{
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(listWithMultipleBlogs[1])
  })
})

describe('author with most blogs',() =>{
  test('of empty list is',() =>{
    const result = listHelper.mostBlogs([])
    expect(result).toBe(0)
  })
  test('when list has only one blog', () =>{
    var result = listHelper.mostBlogs(listWithOneBlog)
    expect(result.author).toEqual(listWithOneBlog[0].author)
    expect(result.blogs).toEqual(1)
  })
  test('when list has multiple blogs is', () =>{
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result.author).toEqual(listWithMultipleBlogs[0].author)
    expect(result.blogs).toEqual(2)
  })
})

describe('author with most likes',() =>{
  test('of empty list is',() =>{
    const result = listHelper.mostLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog', () =>{
    var result = listHelper.mostLikes(listWithOneBlog)
    expect(result.author).toEqual(listWithOneBlog[0].author)
    expect(result.likes).toEqual(listWithOneBlog[0].likes)
  })
  test('when list has multiple blogs is', () =>{
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result.author).toEqual(listWithMultipleBlogs[0].author)
    expect(result.likes).toEqual(8)
  })
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})