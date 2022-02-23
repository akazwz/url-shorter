import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  Box,
  Stack,
  Center,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react'
import { VisitOverview } from '../../components/track/VisitOverview'
import Cobe from '../../components/track/Cobe'
import { LinkInfo, VisitInfo } from '../../src/types/track'
import CommonPie from '../../components/track/CommonPie'
import { generatePieDataFromStringArr, PieData } from '../../src/utils/chart'

const MyMap = dynamic(() => import('../../components/track/Map'), { ssr: false })

export type ResTrackInfo = {
  linkInfo: LinkInfo,
  visitInfo: VisitInfo[]
}

const mobileOSName = ['iOS', 'Android']

const Dashboard = () => {
  const router = useRouter()

  const [visitCount, setVisitCount] = useState<number | null>(null)
  const [ipCount, setIPCount] = useState<number>(0)
  const [mobileVisit, setMobileVisit] = useState<number>(0)
  const [pcVisit, setPCVisit] = useState<number>(0)

  const [markerPoints, setMarkerPoints] = useState<[number, number][] | null>(null)

  const [browserNamePieDataState, setBrowserNamePieData] = useState<PieData[]>([])
  const [osNamePieDataState, setOSNamePieData] = useState<PieData[]>([])
  const [deviceVendorDataState, setDeviceVendorPieData] = useState<PieData[]>([])
  const [deviceModelPieDataState, setDeviceModelPieData] = useState<PieData[]>([])

  useEffect(() => {
    if (!router.isReady) return
    const { shortid } = router.query
    fetch(`/api/track/${shortid}`)
      .then((res) => {
        if (!res.ok) {
          alert('short id error')
          router.push('/').then()
          return
        }
        res.json().then((resData: ResTrackInfo) => {
          if (!resData.linkInfo) {
            alert('no such short id')
            router.push('/').then()
            return
          }
          setVisitCount(resData.visitInfo.length)
          let ips: string[] = []
          let browserNames: string[] = []
          let osNames: string[] = []
          let deviceVendors: string[] = []
          let deviceModels: string[] = []
          let mobileOSNames: string[] = []
          let pcOSNames: string[] = []
          let latlngs: [number, number][] = []
          let map = new Map()
          resData.visitInfo.map((visit) => {
            const ip = visit.ip
            /* ip count */
            ips.push(ip)

            /* mobile or pc */
            if (mobileOSName.includes(visit.ua.osName)) {
              mobileOSNames.push(visit.ua.osName)
            } else {
              pcOSNames.push(visit.ua.osName)
            }

            /* browser name */
            const browserName = visit.ua.browserName
            browserNames.push(browserName)

            /* os name */
            const osName = visit.ua.osName
            osNames.push(osName)

            /* device vendor */
            const deviceVendor = visit.ua.deviceVendor
            deviceVendors.push(deviceVendor)

            /* device model */
            const deviceModel = visit.ua.deviceModel
            deviceModels.push(deviceModel)

            /* lat lng */
            if (map.get(Number(visit.geo.latitude)) !== Number(visit.geo.longitude)) {
              latlngs.push([Number(visit.geo.latitude), Number(visit.geo.longitude)])
            }
            map.set(Number(visit.geo.latitude), Number(visit.geo.longitude))
          })

          setIPCount(Array.from(new Set(ips)).length)
          setMobileVisit(mobileOSNames.length)
          setPCVisit(pcOSNames.length)
          setMarkerPoints(Array.from(new Set(latlngs)))

          /* browser name pie data */
          setBrowserNamePieData(generatePieDataFromStringArr(browserNames))
          /* os name pie data */
          setOSNamePieData(generatePieDataFromStringArr(osNames))
          /* device vendor */
          setDeviceVendorPieData(generatePieDataFromStringArr(deviceVendors))
          /* device model */
          setDeviceModelPieData(generatePieDataFromStringArr(deviceModels))
        })

      }).catch((e) => {
      console.log(e)
      alert('error')
      router.push('/').then()
    })
  }, [router])

  if (!visitCount) {
    return (
      <Center h={'100vh'}>
        <Spinner/>
      </Center>
    )
  }

  return (
    <Box w={'100vw'} minH={'100vh'} p={3} bg={'gray.900'}>
      <VisitOverview
        visitCount={visitCount || 0}
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
        <Box
          w="100%"
          rounded="lg"
          boxShadow="dark-lg"
          overflow="hidden"
        >
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
          <CommonPie title={'OS'} pieData={osNamePieDataState}/>
        </Box>
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <CommonPie title={'Browser'} pieData={browserNamePieDataState}/>
        </Box>
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <CommonPie title={'Device Vendor'} pieData={deviceVendorDataState}/>
        </Box>
        <Box
          w={'100%'}
          h={'27vh'}
          bg={'gray.800'}
          boxShadow={'dark-lg'}
          rounded={'lg'}
        >
          <CommonPie title={'Device Model'} pieData={deviceModelPieDataState}/>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard