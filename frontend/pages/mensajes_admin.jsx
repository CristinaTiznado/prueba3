import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from "@chakra-ui/react";
import axios from 'axios'

const MensajesAdmin = () => {

const [mensajes, setMensajes] = useState([])
    const getMensajes = async () => {
    const response = await axios.get(`${process.env.API_URL}/mensajes`)
    setMensajes(response.data)
    }
useEffect(() => {
    getMensajes()
}, [])

const showMensajes = () =>{
    return mensajes.map(mensajes =>{
        return (
            // <Tr key={mensajes._id}>
            // <Td>{mensajes.dia}</Td>
            // <Td>{mensajes.mes}</Td>
            // <Td>{mensajes.year}</Td>
            // <Td>{mensajes.administrador.nombre}</Td>
            // <Td>{mensajes.administrador.apellido}</Td>
            // <Td>{mensajes.vecino.nombre}</Td>
            // <Td>{mensajes.vecino.apellido}</Td>
            // <Td>{mensajes.contenido}</Td>
            // </Tr>
            
                <AccordionItem>
                <h2>
                <AccordionButton>
                <Box as="span" flex='1' textAlign='left' width={700}>
                    <Text><b>Fecha:</b> {mensajes.dia}/{mensajes.mes}/{mensajes.year}</Text>
                    <Text><b>Asunto:</b> {mensajes.asunto}</Text>
                </Box>
                <AccordionIcon />
                </AccordionButton>
                </h2>
        <AccordionPanel pb={4}>
            <Text> <b>De:</b> {mensajes.administrador.nombre} {mensajes.administrador.apellido} </Text>
            <Text> <b>Para: </b>
            {mensajes.vecino.map(vecinos=>{
                return "["+vecinos.nombre +" "+ vecinos.apellido+"] "
            })}
            </Text>
            <Text> <br /> </Text>
            <Text >{mensajes.contenido}</Text>

        </AccordionPanel>
</AccordionItem>
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



        <Text fontSize={50} color="white" mt={30} mb={30}>Mensajes</Text>
        <HStack>

            <Box  minW={{ base: "10%", md: "468px"}} width="700">
                <Stack spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                    rounded="16"
                    flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center">
                    {/* <Table variant={"simple"}>
                        <Thead>
                        <Tr>
                            <Td color={"blue.400"}>Dia</Td>
                            <Td color={"blue.400"}>Mes</Td>
                            <Td color={"blue.400"}>Año</Td>
                            <Td color={"blue.400"}>Administrador</Td>
                            <Td>   </Td>
                            <Td color={"blue.400"}>Vecinos</Td>
                            <Td>   </Td>
                            <Td color={"blue.400"}>Contenido</Td>

                        </Tr>
                        </Thead>
                        <Tbody>
                        {showMensajes()}
                    </Tbody>
                    </Table> */}
                    <Accordion allowToggle key={mensajes._id}width={700}>
                    {showMensajes()}
                    </Accordion>

                </Stack>
        </Box>
        </HStack>
        </Flex>
    );
};

export default MensajesAdmin;
