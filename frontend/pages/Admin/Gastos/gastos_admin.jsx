import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody,HStack,Button,Menu, MenuButton, MenuList,MenuItem, TableContainer} from "@chakra-ui/react";
import axios from 'axios'
import { useRouter } from 'next/router'


const GastosAdmin= () => {

const router = useRouter()
const [cobros, setCobros] = useState([])
const getCobros = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/cobros`)
        setCobros(response.data)
    } catch (error) {

    }

}

useEffect(() => {
    getCobros()
}, [])

const showGastos = () => {


return cobros.map(cobros => {
		return (
            <Tr key={cobros._id}>
                <Td>{cobros.mes+"/"+cobros.year}</Td>
                <Td>{"$"+cobros.reserva_total}</Td>
				<Td>{"$"+cobros.multa_total}</Td>
				<Td>{"$"+cobros.costo_total}</Td>
                <Td>{cobros.vecino.nombre+" "+cobros.vecino.apellido}</Td>
                <Td>{cobros.num_cobro}</Td>

            </Tr>
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
    <Box backgroundColor="blue.500" w={"100%"} h="10">
    <Menu>
  <MenuButton  color="white" w="10%" h="10" background={"blue.600"}>
    Menú
  </MenuButton>
  <MenuList >
    <MenuItem color="blue.400" as="b"  onClick={() => router.push("/Admin/inicio_admin")} >Inicio</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Reservas/reservas_admin")}>Reservas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}>Vecinos</MenuItem>
  </MenuList>
</Menu>
    </Box>
    <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" style={{
    position: "fixed",
    top: "20px",
    left: "200px",
    zIndex: 1,
    }}
    onClick={()=>router.push("/Admin/inicio_admin")}>
    Volver atrás</Button>


    <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>Cobros de Vecinos</Text>
    <Button 
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Gastos/agregar_cobro")}>
                    Generar Cobro</Button>
    
            <TableContainer rounded="16" mt={30} width={"90%"}>
                <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                    <Thead>
                    <Tr>
						<Td bgColor={"blue.500"} color={"white"}>Mes/Año</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicios</Td>
						<Td bgColor={"blue.500"} color={"white"}>Multas</Td>
						<Td bgColor={"blue.500"} color={"white"}>Total</Td>
                        <Td bgColor={"blue.500"} color={"white"}>Vecino</Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de Boleta</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showGastos()}
				</Tbody>
                </Table>
                </TableContainer>
    </Flex>
);
};

export default GastosAdmin;