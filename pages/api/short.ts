import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import isUrl from 'is-url'
import absoluteUrl from 'next-absolute-url'

import { setUrl } from '../../lib/redis'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const handler: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'POST':
			return await handleShortUrl(req, res)
		default:
			return res.status(405).json({ success: false })
	}
}

const handleShortUrl = async(req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	const { url } = JSON.parse(req.body)
	/* params must be string */
	if (typeof url !== 'string') {
		return res.status(400).json({ msg: 'params error' })
	}

	/* url must be valid absolute url */
	if (!isUrl(url)) {
		res.status(400).json({ msg: 'url not valid' })
		return
	}

	const short_code = await setUrl(url)

	const { origin } = absoluteUrl(req)
	const short_url = `${origin}/${short_code}`
	return res.status(201).json({
		success: true,
		data: {
			url,
			short_code,
			short_url,
			session,
		}
	})
}

export default handler