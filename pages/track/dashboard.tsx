import dynamic from 'next/dynamic'
import {
  Box,
  Center, Container, SimpleGrid, Square,
  Stack,
} from '@chakra-ui/react'
import { VisitOverview } from '../../components/track/VisitOverview'
import Cobe from '../../components/track/Cobe'
import { useEffect, useState } from 'react'
import { LinkInfo, VisitInfo } from '../../src/types/track'
import BrowserNamePie from '../../components/track/BrowserNamePie'

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
        if (!res.ok) {
          alert('error')
          return
        }
        res.json().then((resData: ResTrackInfo) => {
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
    <Box w={'100vw'} minH={'100vh'} p={3} bg={'gray.900'}>
      <VisitOverview
        visitCount={visitCount}
        ipCount={ipCount}
        mobileVisit={mobileVisit}
        pcVisit={pcVisit}
      />
      <Stack
        mt={6}
        mb={6}
        ml={3}
        mr={3}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box w={'100%'} rounded="lg" boxShadow="dark-lg">
          <MyMap markersPoints={markerPoints}/>
        </Box>
        <Center>
          <Cobe size={750} markers={markerPoints?.map((point) => {
            return { location: point, size: 0.05 }
          })}/>
        </Center>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap={6}
        m={3}
      >
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <BrowserNamePie/>
        </Box>
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <BrowserNamePie/>
        </Box>
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <BrowserNamePie/>
        </Box>
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <BrowserNamePie/>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard