const {PrismaClient} = require('@prisma/client')
const {GraphQLServer} = require('graphql-yoga')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
        link: async (parent, args, context) => {
            return context.prisma.link.findOne({where: {id: Number(args.id)}})
        },
    },
    Mutation: {
        async post(parent, args, context, info) {
            return await context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                }
            })
        },
        async updateLink(parent, args, context) {
            return await context.prisma.link.update({
                where: {id: Number(args.id)},
                data: {
                    ...args.url && {url: args.url},
                    ...args.description && {url: args.description},
                }
            })
        },
        async deleteLink(parent, args, context) {
            return await context.prisma.link.delete({
                where: {id: Number(args.id)},
            })
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
