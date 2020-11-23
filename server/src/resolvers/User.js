async function links(parent, args, context) {
    await context.prisma.user.findOne({where: {id: parent.id}}).links()
}

module.exports = {
    links,
}
