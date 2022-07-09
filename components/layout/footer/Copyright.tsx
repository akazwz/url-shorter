import { Text, TextProps } from '@chakra-ui/react'

interface CopyrightProps extends TextProps{
	name: string
}

export const Copyright = (props: CopyrightProps) => (
	<Text fontSize="sm" {...props}>
		&copy; {new Date().getFullYear()} {props.name}, Inc. All rights reserved.
	</Text>
)