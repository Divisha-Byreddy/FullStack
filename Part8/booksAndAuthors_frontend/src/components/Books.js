import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)
  let genres = ['all genres']
  if(!props.show){
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks
  books.map(book => 
    book.genres.map(genre => {
      if(genres.indexOf(genre) === -1)
       genres.push(genre)
    })
  )

  return (
    <div>
      <h2>books</h2>
      <div>in genre <strong>{genre}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => genre === 'all genres'? book : book.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => 
          <button key = {genre} onClick = {() => setGenre(genre)}>{genre}</button>
        )}
      </div>
    </div>
  )
}

export default Books