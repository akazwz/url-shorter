import { NextRequest } from 'next/server'

export default function middleware (req: NextRequest) {
  const { page, ip, geo, ua } = req
  const { name, params } = page
  console.log('page name:' + name)
  console.log('ip:' + ip)
  console.log('city:' + geo?.city)
  console.log('ua:' + ua)
}