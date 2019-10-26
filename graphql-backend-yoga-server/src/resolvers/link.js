const postedBy = (root,args,context,info) => {
    return context.prisma.link({
        id: root.id
    }).postedBy()
}

const votes = (root,args,context,info) => {
    return context.prisma.link({
        id: root.id
    }).votes()
}

module.exports = {
    postedBy,
    votes
}