import gql from "graphql-tag";

export const ALL_AUTHORS = gql`
  query{
    allAuthors{
      name
      born
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query{
    allBooks{
      title 
      author
      published
    }  
  }
`
export const ADD_BOOK = gql`
  mutation createBook($title : String!, $author : String!, $published : Int!, $genres : [String!]!){
    addBook(
      title : $title,
      author : $author,
      published : $published,
      genres : $genres 
    )
    {
      title
      author
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