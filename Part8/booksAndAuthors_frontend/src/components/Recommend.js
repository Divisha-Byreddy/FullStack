import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FAVORITE_GENRE, ME } from '../queries'

const Recommend = ({show}) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, response] = useLazyQuery(FAVORITE_GENRE)
  const result = useQuery(ME)
  useEffect(() => {
    if(result.data && result.data.me)
      setGenre(result.data.me.favoriteGenre);
  },[result.data])

  useEffect(() => {
    getBooks({variables : {genre : genre}})
  }, [genre])
  
  if(!show)
    return null
    
  if(response.loading){
      return <div>loading....</div>
  }
 
  let books = response.data ? response.data.allBooks : null
  if(books){
    return(
      <div>
         <h2>recommendations</h2> 
         <div>books in your favorite genre <strong>{genre}</strong></div>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    )
  }
  return null
}

export default Recommend