import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import absoluteUrl from 'next-absolute-url'
import { Box, Center, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react'

import { VisitOverview } from '../../components/track/VisitOverview'
import dynamic from 'next/dynamic'
import Cobe from '../../components/track/Cobe'

const MyMap = dynamic(() => import('../../components/track/Map'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async({ params, locale, req }) => {
	const { origin } = absoluteUrl(req)
	const response = await fetch(`${origin}/api/track?short=${params?.short}`, { method: 'GET' })
	if (response.status !== 200) {
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

const Short = () => {
	const dark = useColorModeValue(-1, 1)

	return (
		<Box w={'100vw'} minH={'100vh'} p={3}>
			<VisitOverview visitCount={88} ipCount={88} mobileVisit={88} pcVisit={88} />
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
					boxShadow="lg"
					overflow="hidden"
				>
					<MyMap />
				</Box>
				<Center boxShadow={'lg'} rounded={'lg'}>
					<Cobe size={750} markers={[]} dark={dark} />
				</Center>
			</Stack>
		</Box>
	)
}

export default Short