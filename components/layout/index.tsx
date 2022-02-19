import { ReactNode } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Header } from './header'
import { Footer } from './footer'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  return (
    <Box bg={useColorModeValue('white', 'gray.900')} minH="100vh">
      <Header/>
      <Box
        as="main"
        role="contentinfo"
        mx="auto"
        minH="72vh"
        py="3"
        /*px={{ base: '4', md: '8' }}*/
      >
        {children}
      </Box>
      <Footer/>
    </Box>
  )
}