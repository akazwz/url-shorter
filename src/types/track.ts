export type LinkInfo = {
  id: string
  createdAt: string
  updatedAt: string
  url: string
  shortId: string
  userId: string
}

export type VisitInfo = {
  id: string
  createdAt: string
  updatedAt: string
  ip: string
  linkId: string
  link: LinkInfo
  geoInfoId: string
  geo: GeoInfo
  uaInfoId: string
  ua: UAInfo
}

export type GeoInfo = {
  id: string
  country: string
  city: string
  latitude: string
  longitude: string
  region: string
}

export type UAInfo = {
  id: string
  isBot: string
  uaStr: string
  browserName: string
  browserVersion: string
  osName: string
  osVersion: string
  cpuArchitecture: string
  deviceModel: string
  deviceType: string
  deviceVendor: string
  engineName: string
  enginVersion: string
}