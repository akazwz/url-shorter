import { Box, HStack, SimpleGrid, Spacer, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react'
import IconPark from '@icon-park/react/lib/all'

interface IProps {
  visitCount: number,
  ipCount: number,
  mobileVisit: number,
  pcVisit: number,
}

export const VisitOverview = (props: IProps) => {
  const { visitCount, ipCount, mobileVisit, pcVisit } = props
  const dataVisits = [
    { title: 'Visit Count', number: visitCount, iconName: 'PreviewClose' },
    { title: 'IP Count', number: ipCount, iconName: 'Earth' },
    { title: 'Mobile Visit', number: mobileVisit, iconName: 'Phone' },
    { title: 'PC Visit', number: pcVisit, iconName: 'Computer' },
  ]
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      gap={6}
      m={3}
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