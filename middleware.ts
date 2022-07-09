import { NextRequest, NextResponse, userAgent } from 'next/server'

const middleware = async(req: NextRequest) => {
	const ua = userAgent(req)
	NextResponse.next()
	/* const { page, ip, geo, ua } = req
	 const { name, params } = page
	 if (!params) {
		 return
	 }
	 const baseUrl = process.env.HOST_BASE_URL
	 const jsonStr = JSON.stringify(params)
	 const { shortid } = JSON.parse(jsonStr)
	 if (name === '/api/[shortid]') {
		 /!* save visit info *!/
		 await fetch(`${baseUrl}/api/visit`, {
			 method: 'POST',
			 body: JSON.stringify({
				 shortId: shortid,
				 ip: ip,
				 geo: {
					 country: geo?.country,
					 city: geo?.city,
					 latitude: geo?.latitude,
					 longitude: geo?.longitude,
					 region: geo?.region,
				 },
				 ua: {
					 isBot: ua?.isBot,
					 uaStr: ua?.ua,
					 browserName: ua?.browser.name,
					 browserVersion: ua?.browser.version,
					 osName: ua?.os.name,
					 osVersion: ua?.os.version,
					 cpuArchitecture: ua?.cpu.architecture,
					 deviceModel: ua?.device.model,
					 deviceType: ua?.device.type,
					 deviceVendor: ua?.device.vendor,
					 engineName: ua?.engine.name,
					 enginVersion: ua?.engine.version,
				 }
			 }),
			 headers: {
				 'Content-Type': 'application/json'
			 }
		 })
	 }*/
}

export default middleware