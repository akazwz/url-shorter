import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import absoluteUrl from 'next-absolute-url'
import { Box } from '@chakra-ui/react'
import { VisitOverview } from '../../components/track/VisitOverview'

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
			...(await serverSideTranslations(locale || 'en', ['common', 'index'])),
		},
	}
}

const Short = () => {
	const router = useRouter()
	const { short } = router.query
	return (
		<Box w={'100vw'} minH={'100vh'} p={3}>
			<VisitOverview visitCount={88} ipCount={88} mobileVisit={88} pcVisit={88} />
		</Box>
	)
}

export default Short