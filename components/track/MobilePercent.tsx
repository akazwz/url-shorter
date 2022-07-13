import { Liquid, LiquidConfig } from '@ant-design/plots'
import { Box } from '@chakra-ui/react'

const MobilePercent = () => {
	const config: LiquidConfig = {
		percent: 0.25,
		width: 156,
		height: 156,
		wave: {
			length: 36,
		},
	}

	return (
		<Box maxWidth={'350px'}>
			<Liquid {...config} />
		</Box>
	)
}

export default MobilePercent