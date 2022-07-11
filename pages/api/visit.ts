import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			await handleRecordVisit(req, res)
			return
		default:
			res.status(404).json({ msg: '404 not found' })
			return
	}
}

const handleRecordVisit = async(req: NextApiRequest, res: NextApiResponse) => {
	const { visit } = JSON.parse(req.body)

	try {
		await prisma.visit.create({
			data: {
				ip: visit.ip,
				link: {
					connect: {
						shortCode: visit.short_code,
					},
				},
				country: visit.country,
				city: visit.city,
				latitude: visit.latitude,
				longitude: visit.longitude,
				region: visit.region,
				isBot: visit.is_bot,
				ua: visit.ua,
				browserName: visit.browser_name,
				browserVersion: visit.browser_version,
				deviceModel: visit.device_model,
				deviceType: visit.device_type,
				deviceVendor: visit.device_vendor,
				engineName: visit.engine_name,
				engineVersion: visit.engine_version,
				osName: visit.os_name,
				osVersion: visit.os_version,
				cpuArchitecture: visit.cpu_architecture,
			}
		})
		return res.status(201).json({
			success: true
		})
	} catch (e) {
		return res.status(400).json({
			success: false
		})
	}
}
