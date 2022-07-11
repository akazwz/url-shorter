import {
	Avatar,
	Box,
	VStack,
	Menu,
	MenuButton,
	MenuList,
	HStack,
	Divider,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'

interface UserMenuProps{
	avatar: string | null
	name: string | null
	email: string | null
}

export const UserMenu = ({ avatar, name, email }: Partial<UserMenuProps>) => {
	const bgColor = useColorModeValue('white', 'black')

	return (
		<Box>
			<Menu>
				<MenuButton as={Box} variant={'ghost'}>
					<Avatar src={avatar || ''} size="sm" />
				</MenuButton>
				<MenuList backgroundColor={bgColor}>
					<VStack justifyContent="center" p={3} spacing={3}>
						<HStack>
							<Text>{name}</Text>
						</HStack>
						<Divider />
						<HStack>
							<Text>{email}</Text>
						</HStack>
					</VStack>
				</MenuList>
			</Menu>
		</Box>
	)
}
