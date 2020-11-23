async function post(parent, args, context, info) {
    return await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
        }
    })
}

async function updateLink(parent, args, context) {
    return await context.prisma.link.update({
        where: {id: Number(args.id)},
        data: {
            ...args.url && {url: args.url},
            ...args.description && {url: args.description},
        }
    })
}

async function deleteLink(parent, args, context) {
    return await context.prisma.link.delete({
        where: {id: Number(args.id)},
    })
}

module.exports = {
    post,
    updateLink,
    deleteLink,
}
