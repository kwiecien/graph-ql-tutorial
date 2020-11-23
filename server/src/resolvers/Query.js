function info() {
    return `This is the API of a Hackernews Clone`
}

async function feed(parent, args, context, info) {
    return await context.prisma.link.findMany()
}

async function link(parent, args, context) {
    return await context.prisma.link.findOne({where: {id: Number(args.id)}})
}

module.exports = {
    info,
    feed,
    link,
}
