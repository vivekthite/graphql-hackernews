const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { APP_SECRET , getUserId } = require('../util')

const post = (root,args,context,info) => {
    const userId = getUserId(context)
    const link = {                
        description: args.description,
        url: args.url,
        postedBy: { connect: { id: userId } }
    }
    return context.prisma.createLink(link)
}

const signup = async (root,args,context,info) => {
    //1
    const password = await bcrypt.hash(args.password,10)

    //2
    const user = await context.prisma.createUser({ ...args , password})
    
    //3
    const token = jwt.sign({ userId: user.id } , APP_SECRET)

    //4
    return {
        token,
        user
    }
}

const login = async (root,args,context,info) => {
    //1
    const user = await context.prisma.user({
        email: args.email
    })
    if(!user){
        throw new Error("No such user found")
    }

    //2
    const valid = await bcrypt.compare(args.password,user.password)
    if(!valid){
        throw new Error("Invalid password")
    }

    //3
    const token = jwt.sign({ userId: user.id } , APP_SECRET)

    //4
    return {
        token,
        user
    }
}

const vote = async (root,args,context,info) => {
    //1
    const userId = getUserId(context)

    //2
    const linkExists = await context.prisma.$exists.vote({
        link: {connect: {id: args.voteId}},
        user: {connect: {id: userId}}
    })
    if(linkExists){
        throw new Error(`Already voted for link : ${args.linkId}`)
    }

    //3
    return context.prisma.createVote({
        link: {connect: {id: args.voteId}},
        user: {connect: {id: userId}}
    })
   
}

module.exports = {
    post,
    signup,
    login,
    vote
}