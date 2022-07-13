import { NextApiRequest, NextApiResponse } from 'next'
import { getUrl } from '../../../lib/redis'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return await handleGetShortTrack(req, res)
		default:
			return res.status(405).json({ msg: 'method not allowed' })
	}
}

const handleGetShortTrack = async (req: NextApiRequest, res: NextApiResponse) => {
	const {short} = req.query
	if (typeof short !== 'string') {
		return res.status(400).json({ msg: 'params error' })
	}

	const url = await getUrl(short)

	if (!url) {
		return res.status(400).json({ msg: 'params error' })
	}

	const link = await prisma.link.findUnique({
		where: {
			shortCode: short,
		}
	})

	const visits = await prisma.visit.findMany({
		where: {
			link: {
				shortCode: short,
			},
		},
	})

	return res.status(200).json({
		success: true,
		short,
		visits,
	})
}