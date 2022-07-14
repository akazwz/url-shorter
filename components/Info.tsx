import {
	Button,
	HStack,
	Icon,
	Link,
	Text,
} from '@chakra-ui/react'
import * as React from 'react'
import { Info as InfoIcon } from '@icon-park/react'

export const Info = () => {
	return (
		<HStack
			fontSize={'larger'}
			fontWeight={'bold'}
			w={'100%'}
			justifyContent={'center'}
			bg={'red.500'}
			p={3}
			rounded={'lg'}
		>
			<Icon as={InfoIcon} size={'lg'} />
			<Text>new domain and new version in</Text>
			<Link href={'https://dlj.sh'} isExternal color={'blue.500'}>dlj.sh</Link>
			<Link href={'https://dlj.sh'} isExternal>
				<Button colorScheme={'blue'}>
					Learn more
				</Button>
			</Link>
		</HStack>
	)
}