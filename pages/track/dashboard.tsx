import dynamic from 'next/dynamic'
import {
  Box,
  Center,
  Stack,
} from '@chakra-ui/react'
import { VisitOverview } from '../../components/track/VisitOverview'
import Cobe from '../../components/track/Cobe'
import { useEffect } from 'react'

const Map = dynamic(() => import('../../components/track/Map'), { ssr: false })

const Dashboard = () => {
  const shortId = 'dfsdfs'
  useEffect(() => {
    fetch(`/api/track/${shortId}`)
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          alert('error')
          return
        }
        res.json().then((resData) => {
          console.log(resData)
        })
      }).catch((e) => {
      console.log(e)
    })
  }, [])
  return (
    <Box minH={'100vh'} p={3} bg={'gray.900'}>
      <VisitOverview/>
      <Stack m={3} direction={{ base: 'column', md: 'row' }}>
        <Map/>
        <Center>
          <Cobe size={800}/>
        </Center>
      </Stack>
    </Box>
  )
}

export default Dashboard