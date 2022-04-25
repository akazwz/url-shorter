import { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/redis'

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
	switch (req.method) {
		case 'GET':
			await handleRedirect(req, res)
			return
		case 'POST':
			res.status(404).json({ msg: '404 not found' })
			return
		default:
			res.status(404).json({ msg: '404 not found' })
			return
	}
}

const handleRedirect = async (req:NextApiRequest, res:NextApiResponse) => {
	const { shortid } = req.query
	if (typeof shortid !== 'string') {
		res.redirect(301, '/')
		return
	}
	try {
		/* judge short id is existing */
		const longUrl = await redis.get(shortid)
		if (!longUrl) {
			res.redirect(301, '/')
			return
		}
		res.redirect(301, longUrl)
		return
	} catch (e) {
		res.redirect(301, '/')
		return
	}
}