import {
  Flex,
  Box,
  Text,
  Input, 
  useDisclosure,
  Grid,
  GridItem

} from "@chakra-ui/react";

import { SettingsIcon, ChevronDownIcon, ArrowDownIcon } from '@chakra-ui/icons';
import SwapButton from './SwapButton';
import TokenSelect from './TokenSelect';
import TokenModal from "./Modal/TokenModal";
import {useState} from "react";
import axios from "axios";
import RouteDisplay from "./Route";

export interface Route {
  route: string
  exchangeType: string
  logosArray: string[]
  tokensName: string[]
  output: number
}

export default function Swap() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<number>(0);
  const [uniRoutes, setUniRoutes] = useState<Route[]>([])
  const [balRoutes, setBalRoutes] = useState<Route[]>([])
  const [routes, setRoutes] = useState<Route[]>([])

  function getBestRoutes() {
    let body = {
      "tokenOutContractAddress": window.__address2,
      "tokenInContractAddress": window.__address1,
      "tokenInSymbol": window.__tokenSymbol1,
      "tokenOutSymbol": window.__tokenSymbol2,
      "amount": value,
      "decimalIn": 18,
      "decimalOut": 6
    }

    console.log(body)

    axios.post('http://localhost:3000/aggregate-mainnet/', body).then((response) => {
      console.log(response.data)

      let sortedUniResponseData: Route[] = response.data.filter(function(data: any){
        return data.exchangeType == "Uniswap V2";
      }).sort((a: { output: number; }, b: { output: number; }) => a.output - b.output)

      let sortedBalResponseData: Route[] = response.data.filter(function(data: { tokenExchange: number[]; }){
        return data.tokenExchange.includes(1) || data.tokenExchange.includes(2);
      }).sort((a: { output: number; }, b: { output: number; }) => a.output - b.output)
      setRoutes(sortedBalResponseData.slice(-2).concat(sortedUniResponseData.slice(-2)))

    }).catch((error) => {
      console.error('There was an error fetching the routes data:', error.message);
    })
    return "hello"
  }

  const displayedRoutes = routes.map((highestrRoute) => {
    return (
      <GridItem style={{borderRadius:'30px', marginTop:'8%', marginLeft:'13%'}}w='60%' h='100%' bg='yellow.200'>
        <RouteDisplay
        key={highestrRoute.output} 
        route={highestrRoute.route}
        exchangeType={highestrRoute.exchangeType}
        tokensName={highestrRoute.tokensName}
        logosArray={highestrRoute.logosArray}
        output={highestrRoute.output}
        />
      </GridItem>
    )
  });

  return (
    <div>
    <Box
      w="30.62rem"
      mx="auto"
      mt="5.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem">
      <TokenModal isOpen={isOpen} onClose={onClose} />

      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        bg="white"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0">
        <Text
          color="black"
          fontWeight="500">
          Swap
        </Text>
        <SettingsIcon
          fontSize="1.25rem"
          cursor="pointer"
          _hover={{ color: "rgb(128,128,128)" }}
        />
      </Flex>

      <Box
        p="0.5rem"
        bg="white"
        borderRadius="0 0 1.37rem 1.37rem">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="rgb(247, 248, 250)"
          p="1rem 1rem 1.7rem"
          borderRadius="1.25rem" border="0.06rem solid rgb(237, 238, 242)"
          _hover={{ border: "0.06rem solid rgb(211,211,211)" }}>
          <Box>
            <TokenSelect image={window.__imageSelected} openTokenModal={onOpen} value={window.__selected} button="button1"/>
          </Box>
          <Box>
            <Input
              placeholder="0.0"
              fontWeight="500"
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="right"
              bg="rgb(247, 248, 250)"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="number"
              color="black"
              value={value}
              onChange={function (e) {
                let token2Value = 0
                token2Value = Number(e.target.value)
                setValue(token2Value);
                console.log(value)
                console.log(window.__address1)
              }}
            />
          </Box>
        </Flex>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="rgb(247, 248, 250)"
          pos="relative" p="1rem 1rem 1.7rem"
          borderRadius="1.25rem"
          mt="0.25rem"
          border="0.06rem solid rgb(237, 238, 242)"
          _hover={{ border: "0.06rem solid rgb(211,211,211)" }}>
          <Box>
            <TokenSelect image={window.__imageSelected2} openTokenModal={onOpen} value={window.__selected2} button="button2"/>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="white"
            p="0.18rem"
            borderRadius="0.75rem"
            pos="relative"
            top="-2.37rem"
            left="2.5rem">
            <ArrowDownIcon
              bg="rgb(247, 248, 250)"
              color="rgb(128,128,128)"
              h="1.5rem" width="1.62rem"
              borderRadius="0.75rem"
            />
          </Flex>
          <Box>
            <Input
              placeholder="0.0"
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="right"
              bg="rgb(247, 248, 250)"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="number"
              color="black"
              value={0}
            />
          </Box>
        </Flex>
        <SwapButton handleGetRoutes={getBestRoutes}/>
      </Box>
    </Box>
          <Grid templateColumns='repeat(4, 1fr)' gap={0}>
          {displayedRoutes}
        </Grid>
        </div>
  )
}
