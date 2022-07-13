import { NextApiRequest, NextApiResponse } from 'next'

import { getUrl } from '../../../lib/redis'
import prisma from '../../../lib/prisma'
import { toChartFormat, unique, uniqueAndCountArr, uniqueSimpleArr } from '../../../src/utils/arrayUntils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return await handleGetShortTrack(req, res)
		default:
			return res.status(405).json({ msg: 'method not allowed' })
	}
}

export interface Position{
	latitude: string
	longitude: string
}

export interface ChartFormat{
	key: string
	value: any
}

const handleGetShortTrack = async(req: NextApiRequest, res: NextApiResponse) => {
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
			shortCode: short,
		}
	})

	if (!link) {
		return res.status(400).json({ msg: 'params error' })
	}

	if (link.email) {
		return res.status(400).json({
			msg: 'not public link',
		})
	}

	const visits = await prisma.visit.findMany({
		where: {
			link: {
				shortCode: short,
			},
		},
	})

	let ips: string[] = []

	let browsers: any = []

	let deviceVendors: any = []
	let deviceModels: any = []
	// open systems
	let oss: any = []
	let mobileOSArr: any = []
	let pcOSArr: any = []

	let positionsArr: Position[] = []

	const mobileOSNames = ['iOS', 'Android']

	visits.map((visit) => {
		if (visit.ip) {
			ips.push(visit.ip)
		}
		browsers.push(visit.browserName)
		deviceVendors.push(visit.deviceVendor)
		deviceModels.push(visit.deviceModel)
		oss.push(visit.osName)

		if (visit.osName && mobileOSNames.includes(visit.osName)) {
			mobileOSArr.push(visit.osName)
		} else {
			pcOSArr.push(visit.osName)
		}

		if (visit.latitude && visit.longitude) {
			positionsArr.push({
				latitude: visit.latitude,
				longitude: visit.longitude,
			})
		}
	})

	// unique simple array
	ips = uniqueSimpleArr(ips)

	// unique and count
	oss = uniqueAndCountArr(oss)
	browsers = uniqueAndCountArr(browsers)
	deviceModels = uniqueAndCountArr(deviceModels)
	deviceVendors = uniqueAndCountArr(deviceVendors)

	// to chart format
	const os = toChartFormat(oss)
	const browser = toChartFormat(browsers)
	const deviceModel = toChartFormat(deviceModels)
	const deviceVendor = toChartFormat(deviceVendors)

	const visitCount = visits.length
	const ipCount = ips.length
	const mobileCount = mobileOSArr.length
	const pcCount = pcOSArr.length

	// unique obj total
	const positions = unique(positionsArr)
	const markers: [number, number][] = []
	positions.map((position: Position) => {
		markers.push([Number(position.latitude), Number(position.longitude)])
	})
	return res.status(200).json({
		success: true,
		short,
		ipCount,
		visitCount,
		mobileCount,
		pcCount,
		os,
		browser,
		deviceModel,
		deviceVendor,
		markers,
	})
}