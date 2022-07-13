import { Box, IconButton } from '@chakra-ui/react'
import { Setting } from '@icon-park/react'

const TrackSetting = () => {
	return (
		<Box position={'fixed'} bottom={'50%'} right={1} zIndex={999999}>
			<IconButton aria-label={'setting'} icon={<Setting />} />
		</Box>
	)
}

export default TrackSetting