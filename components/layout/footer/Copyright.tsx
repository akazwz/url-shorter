import { Text, TextProps } from '@chakra-ui/react'

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} URL Shorter, Inc. All rights reserved.
  </Text>
)