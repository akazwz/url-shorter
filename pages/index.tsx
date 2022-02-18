import { FormEvent, useState } from 'react'
import type { NextPage } from 'next'
import {
  Text,
  Input,
  Button,
  VStack,
  Heading,
  FormLabel,
  FormControl, Box, Stack, Spacer, useClipboard, Link,
} from '@chakra-ui/react'
import { Layout } from '../components/layout'

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>('')
  const [shorterUrl, setShorterUrl] = useState<string>('')
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false)

  const { hasCopied, onCopy } = useClipboard(shorterUrl)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsBtnLoading(true)
    fetch(`/api/short`, {
      method: 'POST',
      body: JSON.stringify({ longUrl: url }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setIsBtnLoading(false)
        if (res.status !== 201) {
          alert('error')
          return
        }
        res.json().then((dataRes) => {
          const { shortId } = dataRes
          setShorterUrl(shortId)
        })
      })
      .catch(() => {
        setIsBtnLoading(false)
      })
  }
  return (
    <Layout>
      <VStack spacing={10}>
        <Heading>URL Shorter</Heading>
        <FormControl
          maxW="sm"
          rounded="lg"
          borderStyle="dotted"
          borderWidth="3px"
          p={7}
        >
          <FormLabel>
            URL:
          </FormLabel>
          <Input
            type="url"
            value={url}
            onChange={(e) => {setUrl(e.target.value)}}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            isLoading={isBtnLoading}
            colorScheme="blue"
            mt={3}
          >
            Submit
          </Button>
        </FormControl>
        {shorterUrl.length > 0
          ? <>
            <Text fontSize="lg">
              shorter url
            </Text>
            <Box
              w={{ base: 'sm', sm: 'md', md: 'xl', lg: '3xl', }}
              p={7}
              rounded="lg"
              borderStyle="dotted"
              borderWidth="3px"
            >
              <Stack
                direction={{ base: 'column', md: 'row' }}
                alignItems="center"
                textAlign="center"
              >
                <Link href={shorterUrl} isExternal>
                  {shorterUrl}
                </Link>
                <Spacer/>
                <Button
                  w={{ base: 'xs', md: '20%' }}
                  onClick={onCopy}
                >
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
              </Stack>
            </Box>
          </>
          : null
        }
      </VStack>
    </Layout>
  )
}

export default Home
