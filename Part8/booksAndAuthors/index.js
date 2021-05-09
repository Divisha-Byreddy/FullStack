const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   }, 
// ]

const MONGODB_URI = `mongodb://fullstack:fullstack@cluster0-shard-00-00.tngae.mongodb.net:27017,cluster0-shard-00-01.tngae.mongodb.net:27017,cluster0-shard-00-02.tngae.mongodb.net:27017/graphql?ssl=true&replicaSet=atlas-syzbo0-shard-0&authSource=admin&retryWrites=true`

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

mongoose.set('debug',true)

const typeDefs = gql`
  type User {
    username : String!,
    id : ID!,
    favoriteGenre : String
  }
  type Token{
    value : String!
  }
  type Output{
    name : String!,
    id : ID!,
    born  : Int,
    bookCount : Int!
  }
  type Author {
    name : String!,
    id : ID!,
    born  : Int
  }
  input AuthorType {
    name : String!,
    born  : Int
  }
  type Book {
    title : String!,
    published : Int!,
    author : Author!,
    id : ID!,
    genres : [String!]!
  }
  type Query {
    authorCount : Int!,
    bookCount : Int!,
    allBooks(author : String, genre : String) : [Book!]!,
    allAuthors : [Output!]!,
    me : User
  }
  type Mutation {
    addBook(
      title : String!,
      published : Int!,
      author : AuthorType!
      genres : [String!]!
    ) : Book,
    editAuthor(
      name : String!,
      born : Int
    ) : Author,
    createUser(
      username : String!,
      favoriteGenre : String
    ) : User,
    login(
      username : String!,
      password : String!
    ) : Token
  }
  type Subscription {
    bookAdded : Book!
  }
`

const resolvers = {
  Query: {
    authorCount : () => Author.collection.countDocuments(),
    bookCount : () => Book.collection.countDocuments(),
    allBooks : async (root,args) => {
      if(!args.author && !args.genre){
        return await Book.find({}).populate('author')
      }
      let filteredBooks 
      const author = await Author.findOne({name : args.author})
      if(args.author) 
        filteredBooks = await Book.find({ author : author._id}).populate('author')
      if(args.genre)
        filteredBooks = await Book.find({ genres : {$in : args.genre}}).populate('author')
      return filteredBooks
    },
    allAuthors : async() => {
      let authors = await Author.find({})
      let books = await Book.find({}).populate('author')
      authors.map(author =>{
        const bookCount = books.filter(b => b.author.name === author.name)
        author.bookCount = bookCount.length
      })
      return authors
    },
    me : (root,args,context) =>  context.loggedUser
    
  },
  Mutation : {
    addBook: async (root,args,context) => {
      args = JSON.parse(JSON.stringify(args))
      const loggedUser = context.loggedUser
      if(!loggedUser){
        throw new AuthenticationError('user not autorized')
      }
      let author = await Author.findOne({name : args.author.name})
      if(!author){
        author = new Author({...args.author})
        await author.save()
      }
      const book = new Book({...args, author : author})
      try{
        await book.save()
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs : args
        })
      }
      
      pubsub.publish('BOOK_ADDED', { bookAdded : book})
      return book
    },
    editAuthor: async (root,args,context) => {
      const author =await Author.findOne({name : args.name})
      const loggedUser = context.loggedUser
      console.log(loggedUser);
      if(!loggedUser){
        throw new AuthenticationError('user not autorized')
      }
      if(!author)
        return null
     author.born = args.born
     return await author.save()  
    },
    createUser: async (root,args) => {
      let user = new User({...args})
      try{
       return user.save()
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs : args,
        })
      }
    },
    login : async(root,args) => {
      const user = await User.findOne({username : args.username})

      if(!user || args.password != 'secret'){
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username : user.username,
        id : user._id
      }

      return { value : jwt.sign(userForToken, 'secret')}
    }
  },
  Subscription : {
    bookAdded : {
      subscribe : () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context : async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), 'secret')
      const loggedUser = await User.findById(decodedToken.id)
      return { loggedUser}
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
})