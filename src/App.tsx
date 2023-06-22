import { Home } from "./screens/Home";
import { ToastContainer } from "react-toastify";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
