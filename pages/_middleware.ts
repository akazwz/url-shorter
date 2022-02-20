import { NextRequest } from 'next/server'

export default function middleware (req: NextRequest) {
  const { page, ip, geo, ua } = req
  const { name, params } = page
  const baseUrl = process.env.HOST_BASE_URL
  console.log('page name:' + name)
  if (name === '/api/[shortid]') {
    const jsonStr = JSON.stringify(params)
    const { shortid } = JSON.parse(jsonStr)
    /* get short id */
    fetch(`${baseUrl}/api/visit`, {
      method: 'POST',
      body: JSON.stringify({
        shortId: shortid, ip: ip, geo: geo, ua: {
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
    }).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })
  }
}

