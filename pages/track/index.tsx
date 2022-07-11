import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { VStack, HStack, IconButton, Input, useColorModeValue, Heading, useToast } from '@chakra-ui/react'
import { Trace } from '@icon-park/react'
import { MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/router'

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

	const [shortCode, setShortCode] = useState('')

	const toast = useToast()
	const router = useRouter()

	const handleTrackShort = async(event: MouseEventHandler<HTMLButtonElement>) => {

	}

	return (
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
					value={shortCode}
					onInput={(e) => setShortCode(e.currentTarget.value)}
				/>
				<IconButton
					type="submit"
					aria-label={'search'}
					icon={<Trace />}
					variant="ghost"
					isDisabled={shortCode.length !== 7}
					onClick={async(event) => {
						event.preventDefault()
						const res = await fetch(`/api/track?short=${shortCode}`, { method: 'GET' })
						if (res.status !== 200) {
							toast({
								title: 'No Such Short',
								status: 'error',
								isClosable: true,
								position: 'top'
							})
							return
						}
						await router.push(`/track/${shortCode}`)
					}}
				/>
			</HStack>
		</VStack>
	)
}

export default TrackIndex