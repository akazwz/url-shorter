import type { NextApiRequest, NextApiResponse } from 'next'
import isAbsoluteUrl from 'is-absolute-url'
import { nanoid } from 'nanoid'
import redis from '../../lib/redis'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(404).json({ msg: '404 not found' })
      return
    case 'POST':
      await handleCreateShortUrl(req, res)
      return
    default:
      res.status(404).json({ msg: '404 not found' })
  }
}

const handleCreateShortUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { longUrl } = req.body
  console.log(longUrl)
  /* params must be string */
  if (typeof longUrl !== 'string') {
    res.status(400).json({ msg: 'params error' })
    return
  }

  /* url must be valid absolute url */
  if (!isAbsoluteUrl(longUrl)) {
    res.status(400).json({ msg: 'url not valid' })
    return
  }

  const shortId = nanoid(7)

  try {
    /* judge short id is existing */
    const shortIdInRedis = await redis.get(shortId)
    if (shortIdInRedis) {
      res.status(400).json({ msg: 'short id is used' })
      return
    }
  } catch (e) {
    res.status(500).json({ msg: 'server get error' })
    return
  }

  try {
    /* set url short id */
    /*
    EX seconds -- Set the specified expire time, in seconds.
    PX milliseconds -- Set the specified expire time, in milliseconds.
    NX -- Only set the key if it does not already exist.
    XX -- Only set the key if it already exist.
    KEEPTTL -- Retain the time to live associated with the key
    */
    /* default save 30 days url */
    await redis.set(shortId, longUrl, 'EX', 60 * 60 * 24 * 30)
    res.status(201).json({ shortId: shortId })
    return
  } catch (e) {
    res.status(500).json({ msg: 'server error' })
    return
  }
}