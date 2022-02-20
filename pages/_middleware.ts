import { NextRequest, NextFetchEvent } from 'next/server'

export default async function middleware (req: NextRequest, evt: NextFetchEvent) {
  const { page, ip, geo, ua } = req
  const { name, params } = page

  /* geo info */
  const country = geo?.country
  const city = geo?.city
  const latitude = geo?.latitude
  const longitude = geo?.longitude
  const region = geo?.region

  /* ua info */
  const isBot = ua?.isBot
  const uaStr = ua?.ua
  const browserName = ua?.browser.name
  const browserVersion = ua?.browser.version
  const os = ua?.os
  const cpu = ua?.cpu

  const device = ua?.device
  const engine = ua?.engine

  if (name === '/api/[shortid]') {
    const jsonStr = JSON.stringify(params)
    const { shortid } = JSON.parse(jsonStr)
    /* get short id */
    console.log(shortid)
  }
}

const handleCollectShortIdInfo = (shortid: string,ip: string| undefined, geo:  ) => {

}