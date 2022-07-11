import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			await handleCollectVisitInfo(req, res)
			return
		default:
			res.status(404).json({ msg: '404 not found' })
			return
	}
}

const handleCollectVisitInfo = async(req: NextApiRequest, res: NextApiResponse) => {
	const { visit } = JSON.parse(req.body)

	console.log(visit)
	return res.status(201).json({
		success: true
	})
}
