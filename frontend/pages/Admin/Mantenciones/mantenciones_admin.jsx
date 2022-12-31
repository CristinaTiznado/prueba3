import { useState, useEffect } from "react";
import { Button, Flex, Text, Box, Stack , HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Menu, MenuButton, MenuList,MenuItem} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const MantencionesAdmin = () =>{

    const router = useRouter()

const [mantenciones, setMantenciones] = useState([])
const getMantenciones = async () => {
    const response = await axios.get(`${process.env.API_URL}/mantenciones`)
    setMantenciones(response.data)
}
useEffect(()=> {
    getMantenciones()
},[])

const deleteMantencion = async (x)=> {

    Swal.fire({
        title:'¿Estas seguro de eliminar esta mantención?',
        text:'No se podra deshacer esta acción',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#8DDE7C',
        cancelButtonColor:'#F24343',
        confirmButtonText: 'Aceptar',
        cancelButtonText:'Cancelar'
    }).then((result)=>{
        if(result.value){
            const response = axios.delete(`${process.env.API_URL}/mantencion/delete/${x}`)
            setMantenciones(response.data)
            window.location.reload();
        }
})}

const showMantenciones = () =>{
    return mantenciones.map(mantenciones =>{
    return (
        <AccordionItem key={mantenciones._id}>
                <h2>
                <AccordionButton >
                <Box as="span" flex='1' textAlign='left' width={700}>
                    <Text><b>Fecha:</b> {mantenciones.dia}/{mantenciones.mes}/{mantenciones.year}</Text>
                    <Text><b>Empresa:</b> {mantenciones.nombre_empresa} &nbsp;&nbsp; <b>N° de Mantención:</b> {mantenciones.num_mantencion}  </Text>
                </Box>
                <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Text> <b>Rut Empresa:</b> {mantenciones.rut_empresa} &nbsp;&nbsp; <b>Giro:</b> {mantenciones.giro} </Text>
                    <Text> <b>Hora: </b> {mantenciones.hora} </Text>
                    <Text> <b>Descripción: </b> {mantenciones.descripcion} </Text>
                    <Text> <b>Valor: </b> {mantenciones.valor} </Text>
                    <Text> <b>Observaciones: </b> {mantenciones.observaciones} </Text>
                    <Text> <br /> </Text>
                    <Text ></Text>
                    <Button
                        id={mantenciones.num_mantencion}
                        variant="solid"
                        colorScheme="blue"
                        rounded="50"
                        onClick={()=>deleteMantencion(mantenciones.num_mantencion)}
                        >Eliminar</Button>
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

    <Text fontSize={50} color="white" as={"b"} mt={30} mb={30}>Mantenciones</Text>
    

    <Button mb="2"
                variant="solid"
                colorScheme="blue"
                rounded="50"
                onClick = {() => router.push("/Admin/Mantenciones/agregar_mantencion")}>
                    Agregar Mantencion</Button>

    <Stack mt={30} width={"90%"} alignItems="center" rounded="16" backgroundColor="whiteAlpha.900" direction={['column']}>

                <Accordion allowToggle width={"100%"} mt={5} mb={5}>
                {showMantenciones()}
                </Accordion>
    </Stack>
    </Flex>
);

}

export default MantencionesAdmin;