import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Header } from './header'
import { Footer } from './footer'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  return (
    <Box>
      <Header/>
      <Box
        as="main"
        role="contentinfo"
        mx="auto"
        minH="70vh"
        py="3"
        /*px={{ base: '4', md: '8' }}*/
      >
        {children}
      </Box>
      <Footer/>
    </Box>
  )
}