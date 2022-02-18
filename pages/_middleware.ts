import { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const {ip, geo, ua} = req
}