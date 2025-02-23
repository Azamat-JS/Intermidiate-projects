require('dotenv').config({path: __dirname + '/.env'})
const colors = require('colors')
const express = require('express')
const path = require('path')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')
const connectDB = require('./db/connect')


const app = express()

app.use(express.json())
app.use(cors({credentials:true, origin:"*"}))

connectDB()

app.use('/graphql', graphqlHTTP({
schema,
graphiql:process.env.NODE_ENV === 'development'
}))


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}/graphql`);
})


