const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const Link = require('./resolvers/link')
const User = require('./resolvers/user')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

//2
const resolvers = {
    Query,
    Mutation,
    Link,
    User,
    Subscription,
    Vote
}

//3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request, 
            prisma 
        }
        
    }
})

server.start(() => console.log('server is running on http://localhost:4000'))