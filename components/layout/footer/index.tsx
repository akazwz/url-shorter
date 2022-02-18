import { Box, Stack } from '@chakra-ui/react'
import { Copyright } from './Copyright'
import { Logo } from '../logo'
import { SocialMediaLinks } from './SocialMediaLinks'

export const Footer = () => (
  <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Logo/>
        <SocialMediaLinks/>
      </Stack>
      <Copyright alignSelf={{ base: 'center', sm: 'start' }}/>
    </Stack>
  </Box>
)