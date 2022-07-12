import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return await handleGetShortTrack(req, res)
		default:
			return res.status(405).json({ msg: 'method not allowed' })
	}
}

const handleGetShortTrack = async (req: NextApiRequest, res: NextApiResponse) => {

}