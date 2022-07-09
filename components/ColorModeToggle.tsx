import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Sun, Moon } from '@icon-park/react'

export const ColorModeToggle = () => {
	const { toggleColorMode } = useColorMode()
	const text = useColorModeValue('dark', 'light')
	const SwitchIcon = useColorModeValue(
		<Moon size="24" />,
		<Sun size="24" />
	)
	const handleToggleColorMode = () => {
		toggleColorMode()
	}

	return (
		<>
			<IconButton
				size="md"
				fontSize="lg"
				aria-label={`Switch to ${text} mode`}
				variant="ghost"
				color="current"
				onClick={handleToggleColorMode}
				icon={SwitchIcon}
			/>
		</>
	)
}

