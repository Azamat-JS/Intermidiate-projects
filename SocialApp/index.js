require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const cors = require('cors')
const mongoose = require('mongoose')

const Post = require('./models/Post')

const typeDefs = gql`
type Post {
    id: ID!
    body: String!
    username:String!
    createdAt:String!
}
type Query{
   getPosts:[Post]
}
`


const resolvers = {
    Query: {
       async getPosts(){
            try {
                const posts = await Post.find();
                return posts
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const port = process.env.PORT || 4009
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected successfully');
   return server.listen(port).then(res => {
        console.log(`server running at ${res.url}`);
        
    })
})
