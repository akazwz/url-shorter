import { Box, HStack, Spacer } from '@chakra-ui/react'
import { Copyright } from './Copyright'
import { SocialMediaLinks } from './SocialMediaLinks'

export const Footer = () => (
  <Box
    as="footer"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{ base: '4', md: '8' }}
  >
    <HStack>
      <Copyright/>
      <Spacer/>
      <SocialMediaLinks/>
    </HStack>
  </Box>
)