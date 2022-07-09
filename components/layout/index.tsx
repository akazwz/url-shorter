import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

import { Header } from './header'
import { Footer } from './footer'

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