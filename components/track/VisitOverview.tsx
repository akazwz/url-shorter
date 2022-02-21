import { Box, HStack, SimpleGrid, Spacer, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react'
import IconPark from '@icon-park/react/lib/all'

export const VisitOverview = () => {
  const dataVisits = [
    { title: 'Visit Count', number: 37, iconName: 'PreviewClose' },
    { title: 'IP Count', number: 37, iconName: 'Earth' },
    { title: 'Mobile Visit', number: 37, iconName: 'Phone' },
    { title: 'PC Visit', number: 37, iconName: 'Computer' },
  ]
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
    >
      {dataVisits.map((item, index) => {
        return (
          <HStack
            key={'data-visit' + index}
            bg={'gray.800'}
            boxShadow={'dark-lg'}
            display={'flex'}
            justifyContent={'center'}
            rounded={'lg'}
            p={10}
            m={3}
          >
            <Stat>
              <StatLabel>{item.title}</StatLabel>
              <StatNumber>{item.number}</StatNumber>
            </Stat>
            <Spacer/>
            <Box bg={'blue.500'} p={3} rounded={'lg'}>
              <IconPark size={24} type={item.iconName}/>
            </Box>
          </HStack>
        )
      })}
    </SimpleGrid>
  )
}