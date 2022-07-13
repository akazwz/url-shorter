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
import { useState } from 'react'

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


}

const ShortDashboard = () => {
	const dark = useColorModeValue(-1, 1)
	return (
		<Box w={'100vw'} minH={'100vh'} p={3}>
			<VisitOverview visitCount={88} ipCount={88} mobileVisit={88} pcVisit={88} />
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
					<MyMap />
				</Box>
				<Center boxShadow={'lg'} rounded={'lg'} borderWidth={1}>
					<Cobe size={750} markers={[]} dark={dark} />
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
					<OSPie />
				</Box>
				<Box
					w={'100%'}
					h={'27vh'}
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<BrowserBar />
				</Box>
				<Box
					w={'100%'}
					h={'27vh'}
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<DeviceVendorColumn />
				</Box>
				<Box
					w={'100%'}
					h={'27vh'}
					boxShadow={'lg'}
					rounded={'lg'}
					borderWidth={1}
				>
					<DeviceModelBar />
				</Box>
			</SimpleGrid>
			<TrackSetting />
		</Box>
	)
}

const Short = () => {
	const [loading, setLoading] = useState(true)

	return (
		<>
			{loading ? <Loading /> : <ShortDashboard />}
		</>
	)
}

export default Short