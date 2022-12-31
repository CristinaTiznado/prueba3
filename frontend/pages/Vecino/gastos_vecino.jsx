import { useState, useEffect } from "react";
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, TableContainer} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from 'axios'
import Swal from 'sweetalert2'

const GastosVecino= () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const [cobros, setCobros] = useState([]);

    const setCookieFunction = (value) => {
        localStorage.setItem('codigo', value)
    }

    const getCobros = async () => {
        if(codigo){
            setCookieFunction(codigo)
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/cobros/${props.codigo}`)
                setCobros(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de gastos',
                    icon:'warning',
                    iconColor: '#3085d6',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Volver atras',
                    cancelButtonColor: '#d33'
                }).then((result)=>{
                    if(result.isDismissed){
                        console.log(codigo)
                        router.push({pathname:'/Vecino/inicio_vecino', query:{codigo: codigo},});
                    }
                })
            }
        }else{
            try {
                const response = await axios.get(`${process.env.API_URL}/vecino/cobros/${localStorage.getItem('codigo')}`)
                setCobros(response.data);
            } catch (error) {
                Swal.fire({
                    text:'Vecino no tiene historial de gastos',
                    icon:'warning',
                    iconColor: '#3085d6',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'Volver atras',
                    cancelButtonColor: '#d33'
                }).then((result)=>{
                    if(result.isDismissed){
                        console.log(codigo)
                        router.push({pathname:'/Vecino/inicio_vecino', query:{codigo: codigo},});
                    }
                })
            }
        }
    };

useEffect(() => {
    getCobros()
}, [])

//AGREGAR CONDICION DEL SHOWBUTTON PARA COMPARAR FECHAS
const showCobros = () => {return cobros.map(cobros => {
        return (
            <Tr key={cobros._id}>
                <Td>{cobros.mes}</Td>
                <Td>{cobros.year}</Td>
                <Td>{"$"+cobros.reserva_total}</Td>
				<Td>{"$"+cobros.multa_total}</Td>
				<Td>{"$"+cobros.costo_total}</Td>
                <Td>{cobros.num_cobro}</Td>
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
<Box backgroundColor="blue.500" w={"100%"} h="16">
        <Button colorScheme='blue' onClick={onOpen} h="16">
        Menu
       </Button>
       <Button colorScheme='blue' marginLeft="80%" onClick={()=>router.push("/")} h="16">
        Cerrar Sesión
       </Button>
       </Box>

        <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" marginLeft="-60%"
        onClick={()=>router.push("/Vecino/inicio_vecino")}>
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

          </DrawerBody>
          <DrawerFooter backgroundColor="blue.300">
            <Button mr = {3} onClick={onClose} colorScheme="blue">
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


    <Text fontSize={50} color="white" mt={30} mb={30}>Cobros de Vecinos</Text>
    <TableContainer rounded="16" width={"90%"}>

    
                <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                    <Thead>
                    <Tr>
						<Td bgColor={"blue.500"} color={"white"}>Mes</Td>
						<Td bgColor={"blue.500"} color={"white"}>Año</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicios</Td>
						<Td bgColor={"blue.500"} color={"white"}>Multas</Td>
						<Td bgColor={"blue.500"} color={"white"}>Total</Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de Boleta</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showCobros()}
				</Tbody>
                </Table>
                </TableContainer>
    </Flex>
);
};

export default GastosVecino;