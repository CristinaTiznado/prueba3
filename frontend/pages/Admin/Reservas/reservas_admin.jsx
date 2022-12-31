import { useState, useEffect } from "react";
import { useDisclosure ,Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, Input, TableContainer, Menu, MenuButton, MenuList,MenuItem,Drawer,DrawerFooter, DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody} from "@chakra-ui/react";
import axios from 'axios'
import { SearchIcon, DeleteIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const ReservasAdmin = () => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [reservas, setReservas] = useState([])
    const getReservas = async () => {
        if(localStorage.getItem('reserva')==0){
            try {
                const response = await axios.get(`${process.env.API_URL}/reservas`)
            setReservas(response.data)
            } catch (error) {
            }
        }else
        if(localStorage.getItem('reserva')==1){
            console.log(1)
            try {
                const response = await axios.get(`${process.env.API_URL}/reserva/search/${values.mes}/${values.year}`)
            setReservas(response.data)
            } catch (error) {
            }
        }else
        if(localStorage.getItem('reserva')==2){
            console.log(2)
            try {
                const response = await axios.get(`${process.env.API_URL}/reserva/search/${values.dia}/${values.mes}/${values.year}`)
            setReservas(response.data)
            } catch (error) {
            }
        }
    }

    const [values, setValues]= useState({
        dia:'',
        mes:'',
        year:''
    })

    const deleteReserva = async (x) => {
        Swal.fire({
            title:'¿Estas seguro de eliminar esta reserva?',
            text:'No se podra deshacer esta acción',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#8DDE7C',
            cancelButtonColor:'#F24343',
            confirmButtonText: 'Aceptar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.value){
                const response =axios.delete(`${process.env.API_URL}/reserva/delete/${x}`)
                setReservas(response.data)
                window.location.reload();
            }
        })

}

useEffect(() => {
    getReservas()
    document.title="Lavanderia 60 minutos";
}, [])

const onChange = async (e) => {

    setValues({
        ...values,
        [e.target.name]:e.target.value
        })
        console.log(e.target.name,e.target.value);

}

const onSubmit = async(e) => {
    e.preventDefault()
    if(values.dia=='' && values.mes=="" && values.year==""){
        localStorage.setItem('reserva',0)
        getReservas()
    }else
    if(values.mes=="" || values.year==""){
        Swal.fire({
            title:'Los campos mes y año son obligatarios',
            text:'Por favor relleno los campos',
            icon:'warning',
            confirmButtonColor:'#8DDE7C',
            confirmButtonText: 'Aceptar',
        })
    }else
    if(values.dia==''){
        localStorage.setItem('reserva', 1)
        console.log(localStorage.getItem('reserva'))
        getReservas()
    }else{
        localStorage.setItem('reserva',2)
        console.log(localStorage.getItem('reserva'))
        getReservas()
    }
}


const showreservas = () => {
    const validateDate =(y,m,d)=>{
        const fecha = new Date();
        const year = fecha.getFullYear();
        const mes= fecha.getMonth()+1;
        const dia = fecha.getDate();
        const year1 = (parseInt(y))
        const mes1= (parseInt(m))
        const dia1= (parseInt(d))
        if (year1>=year){
            if(mes1>=mes-1 || year1>=year){
                if(dia1>=dia){
                    return true;
                }
            }
        }
    return false;
}



	return reservas.map(reservas => {
		return (
            <Tr key = {reservas._id}>
                <Td>{reservas.dia+"/"+reservas.mes+"/"+reservas.year}</Td>
				<Td>{reservas.hora}</Td>
				<Td>{reservas.servicio.nombre}</Td>
                <Td>{reservas.vecino.nombre+" "+reservas.vecino.apellido}</Td>
				<Td>{reservas.num_reserva}</Td>
                    <Td>
                        {validateDate(reservas.year,reservas.mes,reservas.dia) ? (<Button
                id={reservas.num_reserva}
                    variant="solid"
                    colorScheme="blue"
                    rounded="50"
                    rightIcon={<DeleteIcon /> }
                    onClick={()=> deleteReserva(reservas.num_reserva)}
                    >Eliminar</Button>) :  <Button
                    id={reservas.num_reserva}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        disabled
                        rightIcon={<DeleteIcon /> }
                        >Eliminar</Button>
                        }
                    </Td>
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

      <Text fontSize={50} color="white" mt={30} mb={30} fontFamily="inherit" >Reservas de Servicio</Text>
      <Button
            variant = "solid"
            colorScheme = "blue"
            width = "30%"
            rounded = "40"
            mb={10}
            onClick = {() => router.push("/Admin/Reservas/agregar_reserva")}
        >Agregar Reserva
      </Button>
    <Stack mb={30}>
    <Box  minW={{ base: "10%", md: "468px"}}>
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

                <Stack direction={['column', 'row']}>
                <VStack>
                <Text color={"blue.400"} as="b">Día</Text>
                <Input placeholder="Ejemplo: 20" onChange={onChange} name="dia" ></Input>
                </VStack>
                <VStack>
                <Text color={"blue.400"} as="b">Mes</Text>
                <Input placeholder="Ejemplo: 02" onChange={onChange} name="mes" ></Input>
                </VStack>
                <VStack>
                <Text color={"blue.400"} as="b">Año</Text>
                <Input placeholder="Ejemplo: 2022" onChange={onChange} name="year" ></Input>
                </VStack>

            </Stack>
            <Button
                        variant = "solid"
                        colorScheme = "blue"
                        width = "30%"
                        rounded = "40"
                        mt={10}
                        rightIcon={<SearchIcon /> }
                        onClick={onSubmit}
                        >Buscar
                </Button>
            </Stack>

        </form>
        </Box>
    </Stack>
                <TableContainer rounded="16" width={"90%"}>
                <Table variant={"simple"} colorScheme="blue" backgroundColor="whiteAlpha.900">
                    <Thead>
                    <Tr >
						<Td bgColor={"blue.500"} color={"white"}>Fecha</Td>
						<Td bgColor={"blue.500"} color={"white"}>Hora</Td>
						<Td bgColor={"blue.500"} color={"white"}>Servicio</Td>
                        <Td bgColor={"blue.500"} color={"white"}>Vecino</Td>
						<Td bgColor={"blue.500"} color={"white"}>N° de reserva</Td>
						<Td bgColor={"blue.500"} color={"white"}>Acciones</Td>
					</Tr>
                    </Thead>
                    <Tbody>
                    {showreservas()}
				</Tbody>
                </Table>
                </TableContainer>


</Flex>
);
};

export default ReservasAdmin;