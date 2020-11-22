const {PrismaClient} = require('@prisma/client')
const {GraphQLServer} = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}]

let idCount = links.length;

const findLink = id => links.find(link => link.id === id)

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => findLink(args.id),
    },
    Mutation: {
        post(parent, args) {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink(parent, args) {
            const link = findLink(args.id)
            link.url = args.url || link.url
            link.description = args.description || link.description
            return link
        },
        deleteLink(parent, args) {
            const link = findLink(args.id)
            const index = links.indexOf(link)
            links.splice(index, 1)
            return link
        },
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
