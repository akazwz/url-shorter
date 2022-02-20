import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await handleCollectVisitInfo(req, res)
      return
    default:
      res.status(404).json({ msg: '404 not found' })
  }
}

const handleCollectVisitInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { shortId, ip, geo, ua } = req.body
  /* params must be string */
  if (typeof shortId !== 'string') {
    res.status(400).json({ msg: 'params error' })
    return
  }
  try {
    const visitInfo = await prisma.vistInfo.create({
      data: {
        ip: ip,
        link: {
          connect: { shortId: shortId }
        },
        geo: {
          create: geo
        },
        ua: {
          create: ua
        }
      }
    })
    console.log(visitInfo)
  } catch (e) {
    console.log('error middleware')
  } finally {
    await prisma.$disconnect()
  }
}
