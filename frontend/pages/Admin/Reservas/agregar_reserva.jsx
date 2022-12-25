import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select,Label, Menu, MenuButton, MenuList,MenuItem } from "@chakra-ui/react";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/router";





const AgregarReserva=()=> {


    const [selectedOption, setSelectedOption] = useState('')
    const [valor, setValor] = useState('0')
    const [valor2, setValor2] = useState('0')
    const [open, setOpen] = useState(false)
    const refOne = useRef(null)
    const router = useRouter();


    const [values, setValues]= useState({
        dia:'',
        mes:'',
        year:'',
        hora:'',
        servicio:'',
        vecino:'',
        costo_base:'',
        costo_extra: 0
    })

    useEffect(() => {

        getVecinos()
        getServicios()
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        console.log(e.key)
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }

    //posiblemente hay que eliminar



    const onChange = async (e) => {
        
        if(e.target.name=="servicio"){

            const response1 = await axios.get(`${process.env.API_URL}/servicio/search/${e.target.value}`)
            setValor(response1.data.costo)
            setValues({
                ...values,
                servicio:response1.data._id,
                costo_base:response1.data.costo
                })
                console.log(e.target.name, response1.data.costo);
        }else
        if(e.target.name == "vecino"){
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${e.target.value}`)

            setValues({
                ...values,
                [e.target.name]:response.data._id
                })
                console.log(e.target.name,response.data._id);
        }else
        if(e.target.name != "vecino" || e.target.name != "servicio"){
            setValues({
                ...values,
                [e.target.name]:e.target.value
                })
                console.log(e.target.name,e.target.value);
        }
        if(e.target.name=="costo_extra"){
            console.log(e.target.value)
            if(!e.target.value)
            {
                setValues({
                    ...values,
                    costo_extra:0
                    })
                    console.log(e.target.name,e.target.value);
            }
            if(e.target.value.length>4){
              e.target.value=e.target.value.substring(0,4);
            }
        setValor2(e.target.value)
        }
    }

    /**Funcion que permite agregar los valores de: Día, Mes y Año
     */
    const DateSetter = (e) =>
    {
        const string = e.target.value
        const year = string.substring(0,4)
        const mes = string.substring(5,7)
        const dia = string.substring(8,10)

        setValues({...values,dia,mes,year});
    }


    /**
     *Funciones que permiten establecer las fechas limites para un input Date
     *
     */
    function castMin()
    {
        const currentDate = new Date();
        const dateString1 = currentDate.toLocaleDateString('es-ES', { day: '2-digit' });
        const dateString2 = currentDate.toLocaleDateString('es-ES', { month: '2-digit' });
        const dateString3 = currentDate.toLocaleDateString('es-ES', { year: 'numeric' });

        const fechaMinima = (dateString3 + '-' + dateString2 + '-' + dateString1)
        return fechaMinima;
    }


    function castMax()
    {
        const currentDate = new Date();
        const dateString1 = currentDate.toLocaleDateString('es-ES', { day: '2-digit' });
        const dateString2 = currentDate.toLocaleDateString('es-ES', { month: '2-digit' });
        const dateString3 = currentDate.toLocaleDateString('es-ES', { year: 'numeric' });
        const dia2='01'
        const mes2='01'
        const mes= (parseInt(dateString2, 10)+1);
        const year2 = (parseInt(dateString3, 10)+1);

        if(dateString2==12)
        {
                const fechaMaxima = (year2 + '-' + mes2 + '-' + dia2)
            return fechaMaxima;
        }else
        {
                const fechaMaxima = (dateString3 + '-' + mes + '-' + dateString1)
            return fechaMaxima;
        }
    }



    const Actualizar = () =>{

        if(values.servicio.nombre=='lavadora'){
            setValues({...values,
                costo_base: "8000"});
        }
        if(values.servicio.nombre=='secadora'){
            setValues({...values,
                costo_base: "6000"});
        }
    }


    const onSubmit= async (e) =>{

        e.preventDefault()
        Actualizar();
        console.log(values)



        try {
        const response = await axios.post(`${process.env.API_URL}/reserva/${vecino_select.value}`,values)
        

        if(response.status===201){
            Swal.fire({
            title:"Reserva Registrada",
            icon:'success',
            confirmButtonText:'OK'
            }).then(()=>{
            window.location.reload();
        })
        }
        } catch (error) {
            console.log(error.status)
        Swal.fire({
            title:"No se pudo agendar la Reserva",
            text:'Por favor revise los datos ingresado',
            icon:'warning',
            confirmButtonText:'OK'
        })
        }
    }

    const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }

    const [servicios, setServicios] = useState([])
    const getServicios = async () => {
    const response = await axios.get(`${process.env.API_URL}/servicios`)
    setServicios(response.data)
    }

    const showVecinos= () =>{
        return vecinos.map(vecinos =>{
            if(vecinos.estado=='activo')
            return (
            <option name="vecino" key={vecinos._id} value={vecinos.codigo}>{vecinos.nombre} {vecinos.apellido}</option>

        )
    })
    }

    const showServicios= () =>{

        return servicios.map(servicios =>{
        return (

            <option name="servicio" key={servicios.nombre} value={servicios._id}>{servicios.nombre}</option>
        )
        })
    }

    const Tot = () => {
        if(!valor2)
        {
            const result = valor
            return result
        }
        const result = parseInt(valor, 10) + parseInt(valor2, 10)
        return result
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
    <MenuItem color="blue.400" as="b"  onClick={() => router.push("/Admin/Reservas/reservas_admin")} >Reservas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Gastos/gastos_admin")}>Gastos</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mensajes/mensajes_admin")}>Mensajes</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Multas/multas_admin")}>Multas</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Mantenciones/mantenciones_admin")}>Manteciones</MenuItem>
    <MenuItem color="blue.400" as="b" onClick={() => router.push("/Admin/Vecino/vecinos_admin")}>Vecinos</MenuItem>
  </MenuList>
</Menu>
    </Box>
              <Text fontSize={50} color="white" mt={30} mb={30}>Crear Reserva</Text>
              <Box  minW={{ base: "10%", md: "468px"}} >
            <form>
                <Stack spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                    rounded="16"
                    flexDir="column"
            mb="2"
            justifyContent="left"
            alignItems="left">
                <HStack>
                    <VStack spacing={6}>
                            <HStack>

                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Fecha:</Text>
                                    <Input type="date" id="start"
                                        date={new Date()}
                                        onChange={DateSetter}
                                        min={castMin()} max={castMax()}></Input>
                            </HStack>

                            <HStack>
                                    <Text color={"blue.400"} as="b" >Hora:</Text>
                                    <Input width={60} 
                                    type="time"
                                    pattern="[0-9]{2}:[0-9]{2}" name={"hora"} onChange={onChange} step={3600}></Input>
                            </HStack>
                            <HStack>
                                    <Text  value={selectedOption} color={"blue.400"} name="servicio" as="b" >Servicio:</Text>
                                    <Select placeholder='seleccione servicio' name="servicio" onChange={onChange}>
                                        {showServicios()}
                                    </Select>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Vecino</Text>
                                    <Select id="vecino_select" placeholder='Vecinos' name="vecino" onChange={onChange}>
                                    {showVecinos()}
                                    </Select>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo del Servicio</Text>(
                                    <Text name='costo_base'>{"$"+valor}</Text>)

                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo Extra </Text>
                                    <Input width={60} placeholder={'0'} type={"number"} maxLength={5} name={"costo_extra"} onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo total </Text>
                                    <Text name='costoTotal'> {"$"+Tot()} </Text>
                            </HStack>
                    </VStack>

                    </HStack>
                                <Button mb="2"
                                    variant="solid"
                                    colorScheme="blue"
                                    rounded="50"
                                    onClick={onSubmit}
                                    >
                                        CREAR
                                </Button>
                </Stack>
            </form>
        </Box>

            </Flex>
)
}

export default AgregarReserva