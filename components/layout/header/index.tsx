import { Box, HStack, Spacer } from '@chakra-ui/react'
import { Logo } from '../logo'
import { ColorModeToggle } from './ColorModeToggle'
import { Info } from '../../Info'

export const Header = () => {
	return (
		<Box
			as="header"
			mx="auto"
			maxW="7xl"
			py="3"
			px={{ base: '4', md: '8' }}
		>
			<HStack>
				<Info />
			</HStack>
			<HStack spacing={7}>
				<Logo />
				<Spacer />
				<ColorModeToggle />
			</HStack>
		</Box>
	)
}