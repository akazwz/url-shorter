import { Box, Stack, HStack } from '@chakra-ui/react'

import { Copyright } from './Copyright'
import { Logo } from '../../Logo'
import { SocialMediaLinks } from './SocialMediaLinks'
import { LanguagesSwitch } from '../../LanguagesSwitch'
import { ColorModeToggle } from '../../ColorModeToggle'

export const Footer = () => (
	<Box
		as="footer"
		position="fixed"
		bottom={0}
		borderTopWidth={1}
		w="100%"
	>
		<Stack maxW={'5xl'} mx={'auto'} p={3}>
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