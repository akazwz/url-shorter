import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await handleGetShortLinkTrack(req, res)
      return
    case 'POST':
      res.status(404).json({ msg: '404 not found' })
      return
    default:
      res.status(404).json({ msg: '404 not found' })
      return
  }
}
const handleGetShortLinkTrack = async (req: NextApiRequest, res: NextApiResponse) => {
  const { shortid } = req.query
  if (typeof shortid !== 'string') {
    res.status(400).json({ msg: 'params error' })
    return
  }

  try {
    const linkInfo = await prisma.linkInfo.findUnique({
      where: { shortId: shortid },
    })

    const visitInfo = await prisma.vistInfo.findMany({
      where: {
        link: {
          shortId: shortid,
        }
      },
      include: {
        geo: true,
        ua: true,
      }
    })
    res.status(200).json({
      linkInfo: linkInfo,
      visitInfo: visitInfo,
    })
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: 'server error' })
    return
  }
}