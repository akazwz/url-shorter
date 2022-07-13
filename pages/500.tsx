import { Center, Image } from '@chakra-ui/react'
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
			<Image src={'/undraw_server_down.svg'} alt={'server down'} draggable={false} />
		</Center>
	)
}

export default ErrorPage