import { HStack } from '@chakra-ui/react'
import { ApiApp } from '@icon-park/react'

interface LogoProps{
	size: string
}

export const Logo = ({ size }: LogoProps) => {
	return (
		<HStack spacing={3}>
			<ApiApp
				size={size}
			/>
		</HStack>
	)
}