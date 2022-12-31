import { useState, useEffect } from "react";
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,HStack, Input, Menu, MenuButton, MenuList,MenuItem} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const VecinosAdmin= () => {

    const router = useRouter()
    const [vecinos, setVecinos] = useState([])
    const [reservas, setReservas] = useState([])

    const today = new Date();
    const meis = today.getMonth()+1

    const [fecha,setFecha] = useState({

        dia:today.getDate().toString(),
        mes:meis.toString(),
        anio:today.getFullYear().toString(),
    })

    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }
    

    const deleteVecino = async (x) => {

    Swal.fire({
        title:'¿Estas seguro de eliminar a este vecino?',
        text:'No se podra deshacer esta acción',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#8DDE7C',
        cancelButtonColor:'#F24343',
        confirmButtonText: 'Aceptar',
        cancelButtonText:'Cancelar'
    }).then(async (result)=>{
        if(result.value){
            
        const response = await axios.get(`${process.env.API_URL}/vecino/reservas/${x}`)
        const reservas = response.data
        console.log(response.data)
      
        // Iterar sobre las reservas y eliminar las que aún no han pasado
        for (const reserva of reservas) {
          const { dia, mes, year ,num_reserva } = reserva
          console.log(dia)
          console.log(mes)
          console.log(year)
          console.log(fecha.dia)
          console.log(fecha.mes)
          console.log(fecha.anio)
          if (year > fecha.anio || (year == fecha.anio && mes > fecha.mes) || (year == fecha.anio && mes == fecha.mes && dia > fecha.dia)) {
            // Eliminar la reserva
            await axios.delete(`${process.env.API_URL}/reserva/delete/${num_reserva}`)
            console.log("se elimino una reserva")
          }
        }
        // Eliminar al vecino
        const response1 = await axios.put(`${process.env.API_URL}/vecino/update/estado/${x}`)
        setVecinos(response1.data)
        window.location.reload();
        }


    })
}


    useEffect(() => {
        getVecinos()
    }, [])

    const showVecinos = () =>{
        return vecinos.map(vecinos =>{
            if(vecinos.estado=='activo')
            return (
                <Tr key={vecinos._id}>
                <Td>{vecinos.nombre}</Td>
                <Td>{vecinos.apellido}</Td>
                <Td>{vecinos.rut}</Td>
                <Td>{vecinos.vivienda}</Td>
                <Td>{vecinos.horas}</Td>
                <Td>{vecinos.permiso}</Td>
                <Td>{   <Button
                        id={vecinos.codigo}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        width={"full"}
                        onClick={()=> router.push({pathname:'/Admin/Vecino/editar_vecino',
                    query:{codigo:vecinos.codigo}})}
                        >Editar</Button>}</Td>
                <Td>{   <Button
                        id={vecinos.codigo}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        width={"80%"}
                        onClick={()=>deleteVecino(vecinos.codigo)}
                        >Eliminar</Button>}</Td>
                </Tr>
            )
        })
    }

return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
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
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Gastos/gastos_admin")}>Gastos</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</MenuItem>
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

        <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>Vecinos</Text>
        <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("agregar_vecino")}>
                    Agregar Vecino</Button>
        <HStack>

            <Box  minW={{ base: "10%", md: "468px"}} width="100wh" >
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
                            <Td color={"blue.400"}>Opciones</Td>
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