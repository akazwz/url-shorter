import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'
import { getUrl } from '../../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return await handleGetTrack(req, res)
		default:
			return res.status(405).json({ msg: 'method not allowed' })
	}
}

const handleGetTrack = async(req: NextApiRequest, res: NextApiResponse) => {
	const { short } = req.query
	if (typeof short !== 'string') {
		return res.status(400).json({ msg: 'params error' })
	}

	const url = await getUrl(short)

	if (!url) {
		return res.status(400).json({ msg: 'params error' })
	}

	const link = await prisma.link.findUnique({
		where: {
			shortCode: short
		},
	})

	if (!link) {
		return res.status(400).json({ msg: 'params error' })
	}

	if (link.email) {
		return res.status(400).json({
			msg: 'not public link',
			email: link.email
		})
	}

	return res.status(200).json({ success: true })
}

