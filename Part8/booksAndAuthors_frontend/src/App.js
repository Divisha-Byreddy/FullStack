
import { useApolloClient, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState()
  const client = useApolloClient()
 
  useEffect(() => {
    const value = localStorage.getItem('loggedInUser') 
    if(value)
      setToken(value)
  },[])

  const logout = (event) => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  const updateCache = (newBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(newBook);
    if (!includedIn(dataInStore.allBooks, newBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(newBook) }
      })
    }
    
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
      if(!authorsInStore.allAuthors.map(a => a.name).includes(newBook.author)){
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: { allAuthors : authorsInStore.allAuthors.concat(newBook.author) }
          }
        })
      }
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData : ({subscriptionData}) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`${newBook.title} person is added`)
      updateCache(newBook)
    }
  })
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ?  
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick = {() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </> :
          <button onClick={() => {setPage('login')}}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm show = {page ==='login'} setToken = {setToken} setPage = {setPage}/>
      <Recommend show = {page === 'recommend'}/>
    </div>
  )
}

export default App