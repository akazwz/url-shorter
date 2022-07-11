import React, { useState } from 'react'
import {
	Stack,
	Heading,
	VStack,
	FormControl,
	Input,
	FormLabel,
	Button,
	Text,
	Box,
	Divider,
	useToast,
	useColorModeValue,
} from '@chakra-ui/react'
import { NextPage, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Github } from '@icon-park/react'
import { signIn } from 'next-auth/react'

import { NextChakraLink } from '../components/NextChakraLink'
import { Logo } from '../components/Logo'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['login'])),
		},
	}
}

const Login: NextPage = () => {
	const [email, setEmail] = useState<string>('')
	const [loading, setLoading] = useState(false)

	const toast = useToast()
	const { t } = useTranslation('login')

	const bgColor = useColorModeValue('gray.100', 'blackAlpha.300')

	const handleLogin = async() => {
		try {
			setLoading(true)
			await signIn('email')
			toast({
				title: t('success'),
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
		} catch (err: any) {
			toast({
				title: t('error'),
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		} finally {
			setLoading(false)
		}
	}

	const handleLoginByGithub = async() => {
		try {
			setLoading(true)
			await signIn('github')
		} catch (err: any) {
			toast({
				title: t('error'),
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Stack p={3}>
			<VStack p={{ md: 10 }} align={'center'} justify={'center'}>
				<Box as={NextChakraLink} href={'/'} mb={7}>
					<Logo size={'48px'} />
				</Box>
				<Stack
					spacing={4}
					w={'full'}
					maxW={'md'}
					p={{ base: 5, md: 10 }}
					bg={bgColor}
					rounded={'lg'}
				>
					<Heading size={'lg'} textAlign={'center'}>
						{t('login')}
					</Heading>
					<FormControl id="email">
						<FormLabel>{t('email')}:</FormLabel>
						<Input
							type="email"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</FormControl>

					<Stack spacing={6}>
						<Button
							colorScheme={'teal'}
							variant={'solid'}
							isLoading={loading}
							onClick={handleLogin}
						>
							{t('loginPasswordsLess')}
						</Button>
					</Stack>
					<Divider />
					<Text align={'center'} fontSize={'lg'} fontWeight={'bold'}>
						{t('or')}
					</Text>
					<Button
						colorScheme={'blue'}
						onClick={handleLoginByGithub}
						rightIcon={<Github />}
					>
						{t('signInByGithub')}
					</Button>
				</Stack>
			</VStack>
		</Stack>
	)
}

export default Login