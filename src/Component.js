import React from 'react';
import { Box, Button, Center, useColorMode, useColorModeValue } from "@chakra-ui/react"

import "./Component.css"

const Component = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dayNightClass = useColorModeValue("day", "night")

  return <Box h="100vh" >
    <header>
      <Center>
        <Button onClick={toggleColorMode} w="100%">
          {colorMode === "light" ? "Goodnight" : "Good morning"}
        </Button>
      </Center>
    </header>
    <Box h="100%" className={`gradient ${dayNightClass}`}>
    </Box>
  </Box>
}

export default Component