import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack} from "@chakra-ui/react";
import axios from 'axios'

const VecinosAdmin= () => {

    const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }
    useEffect(() => {
        getVecinos()
    }, [])

    const showVecinos = () =>{
        return vecinos.map(vecinos =>{
            return (
                <Tr key={vecinos._id}>
                <Td>{vecinos.nombre}</Td>
                <Td>{vecinos.apellido}</Td>
                <Td>{vecinos.rut}</Td>
                <Td>{vecinos.vivienda}</Td>
                <Td>{vecinos.horas}</Td>
                <Td>{vecinos.permiso}</Td>
                </Tr>
            )
        })
    }
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="blue.400"
            alignItems="center"
            >



        <Text fontSize={50} color="white" mt={30} mb={30}>Vecinos</Text>
        <HStack>

            <Box  minW={{ base: "10%", md: "468px"}} >
            <form>
                <Stack spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                    rounded="16"
                    flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center">
                    <Table variant={"simple"}>
                        <Thead>
                        <Tr>
                            <Td color={"blue.400"}>Nombre</Td>
                            <Td color={"blue.400"}>Apellido</Td>
                            <Td color={"blue.400"}>Rut</Td>
                            <Td color={"blue.400"}>Vivienda</Td>
                            <Td color={"blue.400"}>Horas</Td>
                            <Td color={"blue.400"}>Permiso</Td>

                        </Tr>
                        </Thead>
                        <Tbody>
                        {showVecinos()}
                    </Tbody>
                    </Table>
                </Stack>
            </form>
        </Box>
        </HStack>
        </Flex>
    );
};

export default VecinosAdmin;