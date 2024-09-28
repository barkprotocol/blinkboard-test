import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Test',
    email: 'test@barkprotocol.com',
    posts: {
      create: [
        {
          title: 'Join the BARK Protocol community',
          content: 'https://t.me/bark_protocol',
          published: true,
        },
      ],
    },
  },
  {
    name: 'BARK',
    email: 'contact@barkprotocol.com',
    posts: {
      create: [
        {
          title: 'Follow BARK on X',
          content: 'https://x.com/bark_protocol',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Developers',
    email: 'dev@barkprotocol',
    posts: {
      create: [
        {
          title: 'Ask a question about BARK on GitHub',
          content: 'https://www.github.com/barkprotoocl/blinkboard/discussions',
          published: true,
        },
        {
          title: 'BARK on YouTube',
          content: 'https://bark_protocol/youtube',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
