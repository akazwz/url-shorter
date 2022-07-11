import { NextRequest, NextResponse, userAgent } from 'next/server'

import { getUrl } from './lib/redis'
import { Visit } from './types'

const middleware = async(req: NextRequest) => {
	return await redirects(req)
}

const redirects = async(req: NextRequest) => {
	const start = Date.now()
	const path = req.nextUrl.pathname.split('/')[1]
	const whiteList = [
		'favicon.ico',
		'',
		'api',
		'_next',
		'login',
		'track',
	]
	if (whiteList.includes(path)) {
		return
	}
	const url = await getUrl(path)

	const host = req.nextUrl.protocol + '//' + req.nextUrl.host
	const end = Date.now()
	if (!url) {
		return NextResponse.redirect(host)
	}
	await recordVisits(req, path)
	const endVisits = Date.now()
	console.log(end - start)
	console.log(endVisits - end)
	return NextResponse.redirect(url)
}

const recordVisits = async(req: NextRequest, shortCode: string) => {
	const ip = req.ip
	const geo = req.geo
	const ua = userAgent(req)

	const visit: Visit = {
		ip,
		link_id: '',
		short_code: shortCode,
		// geo
		country: geo?.country,
		city: geo?.city,
		latitude: geo?.latitude,
		longitude: geo?.longitude,
		region: geo?.region,
		// ua
		is_bot: ua.isBot,
		ua: ua.ua,
		browser_name: ua.browser.name,
		browser_version: ua.browser.version,
		device_model: ua.device.model,
		device_type: ua.device.type,
		device_vendor: ua.device.vendor,
		engine_name: ua.engine.name,
		engine_version: ua.engine.version,
		os_name: ua.os.name,
		os_version: ua.os.version,
		cpu_architecture: ua.cpu.architecture
	}

	const host = req.nextUrl.protocol + '//' + req.nextUrl.host

	await fetch(`${host}/api/visit`, {
		method: 'POST',
		body: JSON.stringify({
			visit,
		})
	})
}

/*
const redirectShortId = async(shortId: string, req: NextRequest) => {
	const start = Date.now()
	const host = req.nextUrl.protocol + '//' + req.nextUrl.host
	try {
		// get link info
		const shortRes = await fetch(`${host}/api/short?short_id=${shortId}`)

		const { data } = await shortRes.json()
		// no such link
		if (!data) {
			return NextResponse.redirect(`${host}/`)
		}

		const ip = req.ip
		const geo = req.geo
		const ua = userAgent(req)

		const { id, url } = data

		const visits = {
			browser_name: ua.browser.name,
			browser_version: ua.browser.version,
			city: geo?.city,
			country: geo?.country,
			cpu_architecture: ua.cpu.architecture,
			device_model: ua.device.model,
			device_type: ua.device.type,
			device_vendor: ua.device.vendor,
			engine_name: ua.engine.name,
			engine_version: ua.engine.version,
			ip: ip,
			is_bot: ua.isBot,
			latitude: geo?.latitude,
			longitude: geo?.longitude,
			link_id: id,
			os_name: ua.os.name,
			os_version: ua.os.version,
			region: geo?.region,
			short_id: shortId,
			ua: ua.ua
		}

		// record visits
		await fetch(`${host}/api/track`, {
			method: 'POST',
			body: JSON.stringify({
				visits,
			})
		})
		const end = Date.now()
		console.log(end - start)
		// redirects
		return NextResponse.redirect(url)
	} catch (err: any) {
		console.log(err)
		return NextResponse.redirect(`${host}/`)
	}
}
*/

export default middleware