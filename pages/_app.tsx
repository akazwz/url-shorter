import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'

import theme from '../src/theme'

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
	return (
		<RecoilRoot>
			<SessionProvider session={session} refetchInterval={0}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</SessionProvider>
		</RecoilRoot>
	)
}

export default appWithTranslation(MyApp)