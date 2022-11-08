import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./components/Header";
import Swap from "./components/Swap";
import "@fontsource/inter";
import "./global.css";

function App() {
  const  { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Header>
      </Header>
      <Swap />
    </ChakraProvider>
  );
}

export default App;
