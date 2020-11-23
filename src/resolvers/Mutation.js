const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {APP_SECRET, getUserId} = require('../utils')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create({data: {...args, password}})
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findOne({where: {email: args.email}})
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        token,
        user,
    }
}

async function post(parent, args, context, info) {
    return await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
        }
    })
}

// TODO remove?
async function updateLink(parent, args, context) {
    return await context.prisma.link.update({
        where: {id: Number(args.id)},
        data: {
            ...args.url && {url: args.url},
            ...args.description && {url: args.description},
        }
    })
}

// TODO remove?
async function deleteLink(parent, args, context) {
    return await context.prisma.link.delete({
        where: {id: Number(args.id)},
    })
}

module.exports = {
    signup,
    login,
    post,
    updateLink,
    deleteLink,
}
