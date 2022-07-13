import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import absoluteUrl from 'next-absolute-url'
import { Box, Center, SimpleGrid, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import { VisitOverview } from '../../components/track/VisitOverview'
import dynamic from 'next/dynamic'
import Cobe from '../../components/track/Cobe'
import OSPie from '../../components/track/OSPie'
import DeviceModelBar from '../../components/track/DeviceModelBar'
import DeviceVendorColumn from '../../components/track/DeviceVendorColumn'
import BrowserBar from '../../components/track/BrowserBar'
import TrackSetting from '../../components/track/TrackSetting'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Marker } from 'cobe'

const MyMap = dynamic(() => import('../../components/track/Map'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async({ params, locale, req }) => {
	const { origin } = absoluteUrl(req)
	const response = await fetch(`${origin}/api/track?short=${params?.short}`, { method: 'GET' })
	if (response.status !== 200) {
		console.log(response)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			}
		}
	}

	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common', 'track'])),
		},
	}
}

const Loading = () => {
	return (
		<Center minH={'100vh'}>
			<Spinner size={'lg'} />
		</Center>
	)
}

interface ShortDashboardProps{
	visitCount: number
	ipCount: number
	mobileCount: number
	pcCount: number
	markers: [number, number][]
	browser: any[]
	os: any[],
	deviceVendor: any[]
	deviceModel: any[]
}

const ShortDashboard = ({
	browser,
	deviceModel,
	deviceVendor,
	os,
	ipCount,
	visitCount,
	markers,
	mobileCount,
	pcCount
}: ShortDashboardProps) => {
	const dark = useColorModeValue(-1, 1)

	const m: Marker[] = []
	markers.map((mark) => {
		m.push({ location: mark, size: 0.03 })
	})
	return (
		<Box w={'100vw'} minH={'100vh'} p={3}>
			<VisitOverview visitCount={visitCount} ipCount={ipCount} mobileVisit={mobileCount} pcVisit={pcCount} />
			<Stack
				mt={6}
				mb={6}
				ml={3}
				mr={3}
				spacing={6}
				direction={{ base: 'column', md: 'row' }}
			>
				<Box
					w="100%"
					rounded="lg"
					boxShadow="lg"
					overflow="hidden"
					borderWidth={1}
				>
					<MyMap points={markers}/>
				</Box>
				<Center boxShadow={'lg'} rounded={'lg'} borderWidth={1}>
					<Cobe size={750} markers={m} dark={dark} />
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
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<OSPie data={os} />
				</Box>
				<Box
					w={'100%'}
					h={'27vh'}
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<BrowserBar data={browser} />
				</Box>
				<Box
					w={'100%'}
					h={'27vh'}
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<DeviceVendorColumn data={deviceVendor} />
				</Box>
				<Box
					w={'100%'}
					h={'27vh'}
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<DeviceModelBar data={deviceModel} />
				</Box>
			</SimpleGrid>
			<TrackSetting />
		</Box>
	)
}

const Short = () => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<ShortDashboardProps>({
		browser: [],
		deviceModel: [],
		deviceVendor: [],
		os: [],
		ipCount: 0,
		visitCount: 0,
		markers: [],
		mobileCount: 0,
		pcCount: 0,
	})

	const router = useRouter()
	useEffect(() => {
		if (!router.isReady) return
		const { short } = router.query
		const getTrackData = async(short: any) => {
			setLoading(true)
			const res = await fetch(`/api/track/${short}`, { method: 'GET' })
			const data = await res.json()
			/*const { browser, deviceModel, os, deviceVendor, ipCount, visitCount, markers, mobileCount, pcCount } = data*/
			setData(data)
			setLoading(false)
		}
		getTrackData(short).then()
	}, [router.isReady, router.query])

	return (
		<>
			{loading ? <Loading /> : <ShortDashboard {...data} />}
		</>
	)
}

export default Short