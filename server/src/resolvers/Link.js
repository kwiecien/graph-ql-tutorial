async function postedBy(parent, args, context) {
    await context.prisma.link.findOne({where: {id: parent.id}}).postedBy()
}

module.exports = {
    postedBy,
}
