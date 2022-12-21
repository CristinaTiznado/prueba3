import { useEffect, useRef, useState } from 'react'
import { Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select,Label } from "@chakra-ui/react";
import format from 'date-fns/format'
import Swal from 'sweetalert2'
import axios from 'axios'



import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const AgregarReserva=()=> {


    const [selectedOption, setSelectedOption] = useState('')
    const [open, setOpen] = useState(false)
    const [calendar, setCalendar] = useState('')
    const refOne = useRef(null)

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

        localStorage.setItem('reserva', 0)
        getVecinos()
        getServicios()
        setCalendar(format(new Date(), 'dd/MM/yyyy'))
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
    const handleSelect = (date) => {
        console.log("FECHA AAA")
        console.log(date)
        setCalendar(format(date, 'dd/MM/yyyy'))
        const a=date.getDate();
        const b=date.getMonth()+1;
        const c=date.getFullYear();
        const dia=  a.toString();
        const mes=  b.toString();
        const year= c.toString();
        setValues({...values,dia,mes,year});
    }


    const onChange = async (e) => {
        
        if(e.target.name=="servicio"){

            const response1 = await axios.get(`${process.env.API_URL}/servicio/search/${e.target.value}`)
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
            console.log(e.target.name,e.target.value);
            setValues({
                ...values,
                [e.target.name]:e.target.value
                })
                console.log(e.target.name,e.target.value);
        }
    }

    /**Funcion que permite agregar los valores de: Día, Mes y Año
     */
    const DateSetter = (e) =>
    {
        const string = e.target.value
        const timestamp = Date.parse(string)
        const date2 = new Date(timestamp)

        const a=date2.getDate()+1;
        const b=date2.getMonth()+1;
        const c=date2.getFullYear();
        const dia=  a.toString();
        const mes=  b.toString();
        const year= c.toString();

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
            console.log(vecino_select.value)
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

return (
    <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="blue.400"
            alignItems="center"
            >
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
                                    pattern="\d{2}:00" name={"hora"} onChange={onChange} id="time" step={3600}></Input>
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
                                    <Text name='costo_base'>{"$"+values.costo_base}</Text>)

                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo Extra </Text>
                                    <Input width={60} type={"number"} name={"costo_extra"}onChange={onChange} ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Costo total </Text>
                                    <Text>${Number(values.costo_base)+Number(values.costo_extra)}</Text>
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