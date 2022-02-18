import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useEnvironment } from '@chakra-ui/react-env'
import { Sun, DarkMode } from '@icon-park/react'

export const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode()
  const fillColor = useColorModeValue('black', 'white')
  const text = useColorModeValue('dark', 'light')
  let themeColor = useColorModeValue('#1A202C', '#ffffff',)
  const SwitchIcon = useColorModeValue(
    <DarkMode theme="outline" size="24" fill={fillColor}/>,
    <Sun theme="outline" size="24" fill={fillColor}/>
  )
  const { document } = useEnvironment()
  const handleToggleColorMode = () => {
    toggleColorMode()
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeColorMeta) {
      let newThemeColorMeta = document.createElement('meta')
      newThemeColorMeta.setAttribute('name', 'theme-color')
      newThemeColorMeta.content = themeColor
      document.getElementsByTagName('head')[0].appendChild(newThemeColorMeta)
      return
    }
    themeColorMeta.setAttribute('content', themeColor)
  }

  return (
    <>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        onClick={handleToggleColorMode}
        icon={SwitchIcon}
      />
    </>
  )
}

