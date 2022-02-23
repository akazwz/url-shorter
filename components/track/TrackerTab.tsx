import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Input,
  Button,
  VStack,
  Heading,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'

export const TrackerTab = () => {
  const [shortId, setShortId] = useState<string>('')
  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/track/dashboard?shortid=${shortId}`).then()
  }

  return (
    <VStack spacing={10}>
      <Heading>Tracker</Heading>
      <FormControl
        w={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
        rounded="lg"
        borderStyle="dashed"
        borderWidth="3px"
        p={{ base: 3, md: 7, }}
      >
        <FormLabel>
          Short id:
        </FormLabel>
        <Input
          type="url"
          value={shortId}
          onChange={(e) => {setShortId(e.target.value)}}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          colorScheme="blue"
          mt={3}
          disabled={shortId.length !== 5}
        >
          Track
        </Button>
      </FormControl>
    </VStack>
  )
}