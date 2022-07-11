import { useRef, useState } from 'react'
import isUrl from 'is-url'
import { GetStaticProps, NextPage } from 'next'
import {
	Box,
	Button,
	HStack,
	IconButton,
	Input,
	Spacer,
	Stack,
	VStack,
	useClipboard,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Check, Copy, Lightning } from '@icon-park/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../components/layout'
import { NextChakraLink } from '../components/NextChakraLink'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common', 'index'])),
		},
	}
}

const Home: NextPage = () => {
	const [url, setUrl] = useState<string>('')
	const [shortUrl, setShortUrl] = useState('')
	const [loading, setLoading] = useState(false)

	const { hasCopied, onCopy } = useClipboard(shortUrl)

	const inputActiveBg = useColorModeValue('gray.300', 'rgba(132,133,141,0.24)')
	const bgColor = useColorModeValue('gray.200', 'rgba(132,133,141,0.12)')

	const toast = useToast()
	const { t } = useTranslation('index')

	const handleShort = async() => {
		setLoading(true)
		const res = await fetch('/api/short', {
			method: 'POST',
			body: JSON.stringify({
				url,
			})
		})
		setLoading(false)
		if (res.status === 200) {
			const { data } = await res.json()
			const { short_url } = data
			setShortUrl(short_url)
		} else {
			toast({
				title: t('shortError'),
				status: 'error',
				isClosable: true,
			})
		}
	}

	return (
		<VStack minH="30vh" padding={3} spacing={10} mt={'100px'}>
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
					defaultValue={url}
					onChange={(e) => setUrl(e.currentTarget.value)}
				/>
				<IconButton
					type="submit"
					aria-label={'search'}
					icon={<Lightning />}
					variant="ghost"
					isDisabled={!isUrl(url)}
					onClick={handleShort}
					isLoading={loading}
				/>
			</HStack>

			{shortUrl.length > 0 ? (
				<>
					<Box
						w={{ base: 'xs', sm: 'sm', md: 'md', lg: '3xl' }}
						p={{ base: 3, md: 7 }}
						rounded="lg"
						borderStyle="dotted"
						borderWidth="3px"
					>
						<Stack
							direction={{ base: 'column', md: 'row' }}
							alignItems="center"
							textAlign="center"
						>
							<NextChakraLink href={shortUrl} color="blue.500">
								{shortUrl}
							</NextChakraLink>
							<Spacer />
							<Button
								w={{ base: '3xs', md: '25%' }}
								p={3}
								onClick={onCopy}
								leftIcon={hasCopied ? <Check fill="#7ed321" /> : <Copy />}
							>
								{hasCopied ? t('copied') : t('copy')}
							</Button>
						</Stack>
					</Box>
				</>
			) : null}
		</VStack>
	)
}

export default Home
