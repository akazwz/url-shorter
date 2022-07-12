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
				mx="auto"
				minH="73vh"
				py="3"
			>
				{children}
			</Box>
			<Footer />
		</Box>
	)
}

export const Layouts = ({ children }: IProps) => {
	const router = useRouter()
	console.log(router.pathname)
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