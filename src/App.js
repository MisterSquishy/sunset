import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react"
import Component from "./Component";

import './App.css';

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

export const theme = extendTheme({ config })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Component />
      </Box>
    </ChakraProvider>
  );
}

export default App;
