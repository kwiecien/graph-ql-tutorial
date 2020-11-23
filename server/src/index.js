const {deleteLink, updateLink, post} = require("../../src/resolvers/Mutation");
const {link, feed, info} = require("../../src/resolvers/Query");
const {PrismaClient} = require('@prisma/client')
const {GraphQLServer} = require('graphql-yoga')

const resolvers = {
    Query: {
        info,
        feed,
        link
    },
    Mutation: {
        post,
        updateLink,
        deleteLink,
    }
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        prisma
    }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
