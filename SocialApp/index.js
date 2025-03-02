require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const cors = require('cors')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./resolvers/index')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}),
    cors: {
        origin: '*',
        credentials: true,
    }
});

const port = process.env.PORT || 4009
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected successfully');
   return server.listen(port).then(res => {
        console.log(`server running at ${res.url}`);
        
    })
})
