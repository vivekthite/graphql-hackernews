const { prisma } = require('./generated/prisma-client')

async function main(){
    console.log('started');
    //create new link
    const newLink = await prisma.createLink({
        url: "www.prisma.io",
        description: 'prisma replaces traditional ORM'
    })

    console.log(`Created new link : ${newLink.url} (ID: ${newLink.id})`)

    //REad all links from DB and print
    const allLinks = await prisma.links();
    console.log(allLinks)
      prisma.vote({
          id
      }).link()

      
}

main()
.then(() => console.log('completed'))
.catch(e => console.error(e))