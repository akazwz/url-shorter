import { Box, HStack, Link, Spacer } from '@chakra-ui/react'
import { Logo } from '../logo'
import { ColorModeToggle } from './ColorModeToggle'

export const Header = () => {
  return (
    <Box
      as="header"
      mx="auto"
      maxW="7xl"
      py="3"
      px={{ base: '4', md: '8' }}
    >
      <HStack spacing={7}>
        <Logo/>
        <Spacer/>
        <Link href={''} isExternal>Track</Link>
        <ColorModeToggle/>
      </HStack>
    </Box>
  )
}