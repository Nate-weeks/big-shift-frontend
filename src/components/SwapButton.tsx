import { Button, Box} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

type Props = {
  handleGetRoutes: any;
};

export default function SwapButton({handleGetRoutes}: Props) {

  return (
      window.__selected && window.__selected2 ? (
    <Box mt="0.5rem">
      <Button
        color="white"
        bg="rgb(255,140,0)"
        width="100%"
        p="1.62rem"
        borderRadius="1.25rem"
        _hover={{ bg: "rgb(255,165,0)" }}
        onClick={handleGetRoutes}
      >
        Swap
      </Button>
    </Box>
      ) : (
        <Box mt="0.5rem">
          <Button
            color="white"
            bg="rgb(255,140,0)"
            width="100%"
            p="1.62rem"
            borderRadius="1.25rem"
            _hover={{ bg: "rgb(255,165,0)" }}
          >
            Please select token
          </Button>
        </Box>
      )
  )
}
