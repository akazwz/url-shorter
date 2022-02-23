import dynamic from 'next/dynamic'
import {
  Box,
  Center,
  Stack,
} from '@chakra-ui/react'
import { VisitOverview } from '../../components/track/VisitOverview'
import Cobe from '../../components/track/Cobe'
import { useEffect, useState } from 'react'
import { LinkInfo, VisitInfo } from '../../src/types/track'

const MyMap = dynamic(() => import('../../components/track/Map'), { ssr: false })

export type ResTrackInfo = {
  linkInfo: LinkInfo,
  visitInfo: VisitInfo[]
}

const mobileOSName = ['iOS',]

const Dashboard = () => {
  const shortId = 'V43uJ'
  const [visitCount, setVisitCount] = useState<number>(0)
  const [ipCount, setIPCount] = useState<number>(0)
  const [mobileVisit, setMobileVisit] = useState<number>(0)
  const [pcVisit, setPCVisit] = useState<number>(0)

  const [markerPoints, setMarkerPoints] = useState<[number, number][] | null>(null)

  useEffect(() => {
    fetch(`/api/track/${shortId}`)
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          alert('error')
          return
        }
        res.json().then((resData: ResTrackInfo) => {
          console.log(resData.linkInfo)
          setVisitCount(resData.visitInfo.length)
          let ips: string[] = []
          const mobileOSNames = []
          const pcOSNames = []
          let latlngs: [number, number][] = []
          let map = new Map()
          resData.visitInfo.map((visit) => {
            const ip = visit.ip
            ips.push(ip)
            /* mobile */
            if (mobileOSName.includes(visit.ua.osName)) {
              mobileOSNames.push(visit.ua.osName)
            } else {
              pcOSNames.push(visit.ua.osName)
            }
            if (map.get(Number(visit.geo.latitude)) !== Number(visit.geo.longitude)) {
              latlngs.push([Number(visit.geo.latitude), Number(visit.geo.longitude)])
            }
            map.set(Number(visit.geo.latitude), Number(visit.geo.longitude))
          })
          setIPCount(Array.from(new Set(ips)).length)
          setMobileVisit(mobileOSNames.length)
          setPCVisit(pcOSNames.length)
          setMarkerPoints(Array.from(new Set(latlngs)))
        })
      }).catch((e) => {
      console.log(e)
    })
  }, [visitCount])
  return (
    <Box minH={'100vh'} p={3} bg={'gray.900'}>
      <VisitOverview
        visitCount={visitCount}
        ipCount={ipCount}
        mobileVisit={mobileVisit}
        pcVisit={pcVisit}
      />
      <Stack m={3} direction={{ base: 'column', md: 'row' }}>
        <MyMap markersPoints={markerPoints}/>
        <Center>
          <Cobe size={800}/>
        </Center>
      </Stack>
    </Box>
  )
}

export default Dashboard