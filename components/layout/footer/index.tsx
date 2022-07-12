import { Box, Stack, HStack } from '@chakra-ui/react'

import { Copyright } from './Copyright'
import { Logo } from '../../Logo'
import { SocialMediaLinks } from './SocialMediaLinks'
import { LanguagesSwitch } from '../../LanguagesSwitch'
import { ColorModeToggle } from '../../ColorModeToggle'

export const Footer = () => (
	<Box as="footer" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
		<Stack>
			<Stack
				direction={{ base: 'column-reverse', md: 'row' }}
				spacing="4"
				align="center"
				justify="space-between"
			>
				<HStack>
					<Logo size="21px" />
					<Copyright
						name={'DLJ.SH'}
						alignSelf={{ base: 'center', sm: 'start' }}
					/>
				</HStack>
				<HStack>
					<LanguagesSwitch />
					<ColorModeToggle />
					<SocialMediaLinks />
				</HStack>
			</Stack>
		</Stack>
	</Box>
)