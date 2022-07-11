import { Box, Button, HStack, Spacer, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Logo } from '../../Logo'
import { NextChakraLink } from '../../NextChakraLink'

const AuthedLinks = () => {
	const { t } = useTranslation('common')

	return (
		<HStack spacing={7}>
			<NextChakraLink href={'/dashboard'}>
				{t('header.dashboard')}
			</NextChakraLink>
			<Button
				variant={'outline'}
				borderColor={useColorModeValue('black', 'white')}
				onClick={() => signOut()}
			>
				{t('header.signOut')}
			</Button>
		</HStack>
	)
}

const NotAuthedLinks = () => {
	const { t } = useTranslation('common')
	const router = useRouter()
	return (
		<HStack spacing={7}>
			<NextChakraLink href={'/track'} color={router.pathname === '/track' ? 'blue.500' : ''}>
				Track
			</NextChakraLink>
			<NextChakraLink href={'/login'}>
				<Button
					variant={'outline'}
					borderColor={useColorModeValue('black', 'white')}
				>
					{t('header.login')}
				</Button>
			</NextChakraLink>
		</HStack>
	)
}

export const Header = () => {
	const { status } = useSession()

	const router = useRouter()

	const Links = () => {
		return (
			<>
				{
					status === 'authenticated' ? <AuthedLinks /> : <NotAuthedLinks />
				}
			</>
		)
	}

	return (
		<Box
			as="header"
			mx="auto"
			maxW="7xl"
			py="3"
			px={{ base: '4', md: '8' }}
		>
			<HStack>
				<NextChakraLink href={'/'} color={router.pathname === '/' ? 'purple.500' : ''}>
					<Logo size="37px" />
				</NextChakraLink>
				<Spacer />
				<Links />
			</HStack>
		</Box>
	)
}