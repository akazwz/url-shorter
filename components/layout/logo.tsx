import { HStack, Text, useColorModeValue, useToken } from '@chakra-ui/react'
import { CopyLink } from '@icon-park/react'

export const Logo = () => {
  const [white, black] = useToken('colors', ['white', 'gray.800'])
  return (
    <HStack spacing={3}>
      <CopyLink
        theme="two-tone"
        size="37px"
        fill={[useColorModeValue(black, white), '#2F88FF']}
      />
      <Text
        bgGradient="linear(to-r,  #FF0080, #00B0FF)"
        bgClip="text"
        fontSize="3xl"
        fontWeight="extrabold"
      >
        Shorter
      </Text>
    </HStack>
  )
}