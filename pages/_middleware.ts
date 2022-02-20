import { NextRequest } from 'next/server'

export async function middleware (req: NextRequest) {
  const { page, ip, geo, ua } = req
  const { name, params } = page
  if (!params) {
    return
  }
  const baseUrl = process.env.HOST_BASE_URL
  const jsonStr = JSON.stringify(params)
  const { shortid } = JSON.parse(jsonStr)
  if (name === '/api/[shortid]') {
    /* get short id */
    await fetch(`${baseUrl}/api/visit`, {
      method: 'POST',
      body: JSON.stringify({
        shortId: shortid,
        ip: ip,
        geo: geo,
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
  }
}

