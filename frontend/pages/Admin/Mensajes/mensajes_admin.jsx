import { useState, useEffect } from "react";
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Menu, MenuButton, MenuList,MenuItem} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from 'next/router'

const MensajesAdmin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
const router = useRouter()
const [mensajes, setMensajes] = useState([])
    const getMensajes = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/mensajes`)
    setMensajes(response.data)
    } catch (error) {

    }

    }
useEffect(() => {
    getMensajes()
}, [])

const showMensajes = () =>{
    return mensajes.map(mensajes =>{
        return (

                <AccordionItem key={mensajes._id}>
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
            width="150wh"
            height="auto"
            minH={"100vh"}
            backgroundColor="blue.300"
            alignItems="center"
            >
        <Box backgroundColor="blue.500" w={"100%"} h="16">
        <Button colorScheme='blue' onClick={onOpen} h="16">
        Menu
       </Button>
       <Button colorScheme='blue' marginLeft="80%" onClick={()=>router.push("/")} h="16">
        Cerrar Sesión
       </Button>
       </Box>

        <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Admin/inicio_admin")}>
        Volver atrás</Button>

        <Drawer placement='left'  onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader  backgroundColor="blue.500" color="white">Menu</DrawerHeader>
          <DrawerBody backgroundColor="blue.300">
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Inicio</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Reservas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Gastos</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Mensajes</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Multas</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Manteciones</Button>
            <Button width={"100%"} colorScheme="blue" mb="2" height="20" fontSize="20">Vecinos</Button>


          </DrawerBody>
          <DrawerFooter backgroundColor="blue.300">
            <Button mr = {3} onClick={onClose} colorScheme="blue">
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

        <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>Mensajes</Text>
        <Button 
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Mensajes/agregar_mensaje")}>
                    Agregar Mensaje</Button>
        <Stack mt={30} width={"90%"} alignItems="center" rounded="16" backgroundColor="whiteAlpha.900" direction={['column']}>

                    <Accordion allowToggle key={mensajes._id} width={"100%"} mt={5} mb={5}>
                    {showMensajes()}
                    </Accordion>

        </Stack>
        </Flex>
    );
};

export default MensajesAdmin;
