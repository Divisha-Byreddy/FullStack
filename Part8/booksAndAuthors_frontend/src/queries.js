import gql from "graphql-tag";

export const ALL_AUTHORS = gql`
  query{
    allAuthors{
      name
      born
      id
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query{
    allBooks{
      title 
      author{
        name
      }
      published
      genres
    }  
  }
`
export const ADD_BOOK = gql`
  mutation createBook($title : String!, $author : String!, $published : Int!, $genres : [String!]!){
    addBook(
      title : $title,
      author : {
        name : $author
      },
      published : $published,
      genres : $genres 
    )
    {
      title
      author{
        name
      }
      published
      genres 
      id
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation updateAuthor( $name : String!, $number : Int ){
    editAuthor(
      name : $name,
      born : $number
    )
    {
      name
      id
      born 
    }
  }
`
export const LOGIN = gql`
  mutation login($username : String!, $password : String!){
    login(
      username : $username,
      password : $password
    ){
      value
    }
  }
`

export const FAVORITE_GENRE = gql`
  query getBooksByGenre($genre : String!){
    allBooks(genre : $genre){
      title 
      published
      author{
        name
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
      title
      author{
        name
      }
      published
      genres 
      id
    }
  }
`

export const ME = gql`
  query{
    me{
      username,
      favoriteGenre
    }
  }
`