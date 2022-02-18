import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import { Github, Weibo, Twitter } from '@icon-park/react'

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="#"
      aria-label="Weibo"
      target="_blank"
      icon={<Weibo size="20px"/>}
    />
    <IconButton
      as="a"
      href="https://github.com/akazwz"
      aria-label="GitHub"
      target="_blank"
      icon={<Github size="20px"/>}
    />
    <IconButton
      as="a"
      href="#"
      aria-label="Twitter"
      target="_blank"
      icon={<Twitter size="20px"/>}
    />
  </ButtonGroup>
)