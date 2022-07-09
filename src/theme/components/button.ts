import { StyleConfig } from '@chakra-ui/theme-tools'

const Button: StyleConfig = {
	baseStyle: {
		':focus:not(:focus-visible)': {
			boxShadow: 'none',
		},
	},
}

export default Button