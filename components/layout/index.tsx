import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

import { Header } from './header'
import { Footer } from './footer'
import { useRouter } from 'next/router'

interface IProps{
	children: ReactNode
}

export const Layout = ({ children }: IProps) => {
	return (
		<Box>
			<Header />
			<Box
				as="main"
				maxW={'5xl'}
				mx={'auto'}
				px={5}
				pt={24}
				pb={{ base: 24, md: 16 }}
			>
				{children}
			</Box>
			<Footer />
		</Box>
	)
}

export const Layouts = ({ children }: IProps) => {
	const router = useRouter()
	if (router.pathname.startsWith('/dashboard')) {
		return (
			<>
				{children}
			</>
		)
	}

	if (router.pathname === '/track/[short]') {
		return (
			<>
				{children}
			</>
		)
	}

	return (
		<Layout>
			{children}
		</Layout>
	)
}