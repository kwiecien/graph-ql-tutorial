const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const {PrismaClient} = require('@prisma/client')
const {GraphQLServer} = require('graphql-yoga')

const resolvers = {
    Query,
    Mutation,
    User,
    Link,
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => ({
        ...request,
        prisma
    })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
