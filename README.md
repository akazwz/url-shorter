# ‼️next version and new domain is released in https://dlj.sh

# URL Shorter (next version in next branch)

[简体中文](README_ZH.md)

## Simple url shorter build with next.js and redis

## Features

- url shorter
- url visit track
- url track vision dashboard
- map and chart vision
- responsive UI

## ScreenShot

<img alt="url shorter mobile" src="docs/images/shorter_mobile.png" height="400" width="200">
<img alt="url tracker" src="docs/images/tracker.png" height="400" width="400">
<img alt="track dashboard" src="docs/images/track_dashboard_dark_map.png" height="300" width="600">
<img alt="track dashboard mobile" src="docs/images/track_dashboard_mobile.png" height="400" width="200">

## Track Infos

- time

### geo info

- ip
- region
- country
- city
- lat lng

### ua info

- ua string
- browser name
- browser version
- os name
- os version
- cpu
- device model
- device vendor
- engine name
- engin version

## Online demo [url shorter](https://zlz.pw/)

## Technologies or libs I use:

### Core Shorter

- next.js (full stack framework)
- vercel (deployment serverless)
- redis (storage kv : shortid and long urls)
- upstash (serverless database redis)
- ioredis (node redis lib)
- nanoid (generate short id)
- is-url (judge is valid url)
- chakra-ui (frontend ui lib)
- @icon-park/react (icons)

### Visitor Track

- next.js edge middleware (track visit info)
- postgres (storage link and visitor info)
- prisma (ORM)
- leaflet (map: show visitor location)
- react-leaflet (leaflet wrapper)
- cobe (show globe)
- @ant-design/plots (charts)


