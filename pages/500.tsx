import { Center, Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
		},
	}
}

const ErrorPage = () => {
	return (
		<Center>
			<Heading>500</Heading>
		</Center>
	)
}

export default ErrorPage