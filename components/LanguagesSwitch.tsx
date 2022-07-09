import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue,
} from '@chakra-ui/react'
import { Translate } from '@icon-park/react'
import { useRouter } from 'next/router'

export const LanguagesSwitch = () => {
	const { locale } = useRouter()
	let lang = 'English'
	switch (locale) {
		case 'zh':
			lang = '简体中文'
			break
	}

	const router = useRouter()

	const bgColor = useColorModeValue('white', 'black')

	return (
		<>
			<Menu matchWidth>
				<MenuButton as={Button} leftIcon={<Translate />} variant={'ghost'}>
					{lang}
				</MenuButton>
				<MenuList minW="0" backgroundColor={bgColor}>
					<MenuItem
						onClick={() => {
							router
								.replace(router.pathname, router.pathname, { locale: 'en' })
								.then()
						}}
					>
						English
					</MenuItem>
					<MenuItem
						onClick={() => {
							router
								.replace(router.pathname, router.pathname, { locale: 'zh' })
								.then()
						}}
					>
						简体中文
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	)
}