import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { VStack, HStack, IconButton, Input, useColorModeValue, Heading } from '@chakra-ui/react'
import { Trace } from '@icon-park/react'

import { Layout } from '../../components/layout'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common', 'index'])),
		},
	}
}

const TrackIndex = () => {
	const inputActiveBg = useColorModeValue('gray.300', 'rgba(132,133,141,0.24)')
	const bgColor = useColorModeValue('gray.200', 'rgba(132,133,141,0.12)')

	return (
		<Layout>
			<VStack minH="30vh" padding={3} spacing={10} mt={'100px'}>
				<Heading>
					Track
				</Heading>
				<HStack
					as={'form'}
					spacing={0}
					borderWidth={1}
					rounded="lg"
					backgroundColor={bgColor}
					_focusWithin={{
						backgroundColor: inputActiveBg,
					}}
					_hover={{
						backgroundColor: inputActiveBg,
					}}
					width={{ base: '350px', md: '500px', lg: '700px' }}
				>
					<Input
						backgroundColor={'transparent'}
						rounded="lg"
						border={'none'}
						variant="filled"
						size={{ base: 'md', md: 'lg' }}
						placeholder={'short code or short url'}
					/>
					<IconButton
						type="submit"
						aria-label={'search'}
						icon={<Trace />}
						variant="ghost"
					/>
				</HStack>
			</VStack>
		</Layout>
	)
}

export default TrackIndex