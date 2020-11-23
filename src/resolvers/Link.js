// TODO remove?
async function link(parent, args, context) {
    return await context.prisma.link.findOne({where: {id: Number(args.id)}})
}

module.exports = {
    link,
}
