# How to use prisma with typescript and postgres

## Prepare

- ### prisma installed:
```shell
npm i - g prisma
```

- ### postgres cloud instance
    1. get from heroku for free [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql)
    2. get your connection url

- ### one project

## Init

- ### generate schema.prisma and .env
  run
```shell
prisma init
```
  then your project will add prism/schema.prisma and .env with DATABASE_URL replace .env with your real connection url

- ### add some models 
  edit prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_DATABASE_URL")
}

model Link {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  url       String
  shortUrl  String
  userId    String?
  User      User?    @relation(fields: [userId], references: [id])
}

model Profile {
  id     String  @id @default(uuid())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id])
  userId String  @unique
}

model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  name      String?
  email     String
  Link      Link[]
  Profile   Profile[]
}

```

### create schema in your db
 run
```shell
prisma push
```
to create schema
run 
```shell
prisma studio
```
to check

## Use in project

- add api route
```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const userCount = await prisma.user.count()
    res.status(200).json({ userCount: userCount })
  } catch (e) {
    res.status(400).json({ msg: 'error' })
  } finally {
    await prisma.$disconnect()
  }
}
```

- check
  visit localhost:3000/api/hello
  your will see
```json
{
"userCount": 0
}
```


