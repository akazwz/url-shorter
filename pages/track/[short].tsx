import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import absoluteUrl from 'next-absolute-url'

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
		<>
			{short}
		</>
	)
}

export default Short