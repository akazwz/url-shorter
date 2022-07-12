import { Box, HStack, SimpleGrid, Spacer, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import IconPark from '@icon-park/react/lib/all'
import { useTranslation } from 'next-i18next'

interface IProps{
	visitCount: number,
	ipCount: number,
	mobileVisit: number,
	pcVisit: number,
}

export const VisitOverview = (props: IProps) => {
	const { visitCount, ipCount, mobileVisit, pcVisit } = props

	const { t } = useTranslation('track')

	const dataVisits = [
		{ title: t('visitCount'), number: visitCount, iconName: 'Click' },
		{ title: t('ipCount'), number: ipCount, iconName: 'Earth' },
		{ title: t('mobileVisit'), number: mobileVisit, iconName: 'Phone' },
		{ title: t('pcVisit'), number: pcVisit, iconName: 'Computer' },
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
						boxShadow={'lg'}
						display={'flex'}
						justifyContent={'center'}
						rounded={'lg'}
						p={10}
					>
						<Stat>
							<StatLabel>{item.title}</StatLabel>
							<StatNumber>{item.number}</StatNumber>
						</Stat>
						<Spacer />
						<Box borderWidth={1} p={3} rounded={'lg'}>
							<IconPark size={24} type={item.iconName} />
						</Box>
					</HStack>
				)
			})}
		</SimpleGrid>
	)
}