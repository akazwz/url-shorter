import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import isUrl from 'is-url'
import absoluteUrl from 'next-absolute-url'
import { unstable_getServerSession } from 'next-auth'

import { deleteUrl, setUrl } from '../../lib/redis'
import { authOptions } from './auth/[...nextauth]'
import { getIp } from '../../src/utils'
import prisma from '../../lib/prisma'

const handler: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'POST':
			return await handleShortUrl(req, res)
		default:
			return res.status(405).json({ success: false })
	}
}

const handleShortUrl = async(req: NextApiRequest, res: NextApiResponse) => {
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

	const shortCode = await setUrl(url)
	if (!shortCode) {
		return res.status(400).json({ msg: 'short error' })
	}

	try {
		const session = await unstable_getServerSession(req, res, authOptions)
		const email = session?.user?.email || null

		const { origin } = absoluteUrl(req)
		const shortUrl = `${origin}/${shortCode}`
		const ip = getIp(req)

		const link = await prisma.link.create({
			data: {
				url,
				shortCode,
				ip,
				email,
			}
		})

		return res.status(201).json({
			success: true,
			data: {
				url,
				short_code: shortCode,
				short_url: shortUrl,
				link,
			}
		})
	} catch (e) {
		await deleteUrl(shortCode)
		return res.status(400).json({
			success: false,
		})
	}
}

export default handler