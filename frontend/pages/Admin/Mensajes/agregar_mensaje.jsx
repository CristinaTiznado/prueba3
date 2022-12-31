import { useEffect, useState } from 'react'
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack,Button,VStack,HStack,Accordion, Input,Checkbox,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon, Textarea, Menu, MenuButton, MenuList,MenuItem } from "@chakra-ui/react";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from "next/router";


const AgregarMensaje = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
const today = new Date();
const day = today.getDate();
const month= today.getMonth()+1;
const year= today.getFullYear();
const [veci,setVeci]=useState([]);
const router = useRouter();


useEffect(() =>{

getVecinos()
getAdmin()
},[])

const onChange = (e) =>{
    if(e.target.name =='vecino'){
        if(e.target.checked){
            setVeci(prevVeci=>prevVeci.concat(e.target.value));
        }else{
            setVeci(prevVeci=>prevVeci.filter(item => item !== event.target.value));
        }
    }else{
        setValues({
            ...values,
            [e.target.name]:e.target.value, administrador:administrador._id, vecino:veci
            })
            console.log(e.target.name,e.target.value);
    }

}
const [administrador, setAdmin] = useState([])
const getAdmin = async()=>{
    const response = await axios.get(`${process.env.API_URL}/administrador/search/${localStorage.getItem('codigo')}`)
    setAdmin(response.data);

}
const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
}
const [values,setValues]=useState({

    vecino:[''],
    administrador:'',
    dia:day.toString(),
    mes:month.toString(),
    year:year.toString(),
    asunto:'',
    contenido:''
})

const showVecinos= () =>{
    return vecinos.map(vecinos =>{
        if(vecinos.estado=='activo')
         return (
        <Checkbox onChange={onChange} name="vecino" key={vecinos.codigo} value={vecinos._id}>{vecinos.nombre} {vecinos.apellido}</Checkbox>
)
})
}

const search_vecino = async (id) =>{
    const response = await axios.get(`${process.env.API_URL}/vecino/search2/${id}`)
    return response.data.codigo
}

const crear_mensaje = async () =>{
    const response = await axios.post(`${process.env.API_URL}/mensaje`,values)
    console.log(response.data._id)
    return response.data._id
}

const actualizacion_mensaje = async (codigo_vecino,mensajes) =>{
    console.log(mensajes)
    const response = await axios.put(`${process.env.API_URL}/vecino/update/mensaje/${codigo_vecino}`,{mensajes})
    return response.status
}


const onSubmit= async(e) =>{
    e.preventDefault()
    console.log(values)
  
    try {
        if(values.vecino.length !=0 && values.asunto.length != 0 && values.contenido.length !=0){
            crear_mensaje().then(re=>{
            values.vecino.map(id =>{
                search_vecino(id).then(res =>{
                    actualizacion_mensaje(res,re)
                }).catch(error =>{
                    console.log(error)
                    Swal.fire({
                        title:"No se pudo enviar el mensaje",
                        text:'Por favor revise los datos ingresado',
                        icon:'warning',
                        confirmButtonText:'OK'
                    })
                })
            })
        })

            Swal.fire({
              title:"Mensaje Enviado",
              icon:'success',
              confirmButtonText:'OK'
            }).then(()=>{
              window.location.reload();
          })
        }else{
            Swal.fire({
                title:"No se pudo enviar el mensaje",
                text:'Por favor revise los datos ingresado',
                icon:'warning',
                confirmButtonText:'OK'
              })
        }
    } catch (error) {
        console.log(error)
      Swal.fire({
        title:"No se pudo enviar el mensaje",
        text:'Por favor revise los datos ingresado',
        icon:'warning',
        confirmButtonText:'OK'
      })
    }
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
        onClick={()=>router.push("/Admin/Mensajes/mensajes_admin")}>
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

      <Text fontSize={50} color="white" mt={30} mb={30}>Crear Mensaje</Text>
              <Box  minW={{ base: "10%", md: "468px"}} >
            
                <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                rounded="16"
                flexDir="column"
                mb="2"
                justifyContent="left"
                alignItems="left">
                            <HStack>
                                    <Text color={"blue.400"} as="b" >De:</Text>
                                    <Text>{administrador.nombre} {administrador.apellido}</Text>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Vecino(s):</Text>
                                    <Accordion allowToggle width={"full"}>
                                    <AccordionItem>
                                        <h2>
                                        <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                        Vecinos
                                        </Box>
                                        <AccordionIcon />
                                        </AccordionButton>
                                        </h2>
                                    <AccordionPanel pb={4} alignItems={"center"}>
                                    {showVecinos()}
                                    <Checkbox> Todos </Checkbox>
                                    </AccordionPanel>
                                    </AccordionItem>
                                    </Accordion>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} name="servicio" as="b" >Fecha:</Text>
                                    <Text>{day}/{month}/{year}</Text>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Asunto:</Text>(
                                    <Text name='costo_base'></Text>)
                                    <Input width={"full"} type={"text"} name={"asunto"}onChange={onChange} minLength="10" ></Input>
                            </HStack>
                            <HStack>
                                    <Text color={"blue.400"} as="b" >Cuerpo:</Text>
                                    <Textarea width={"full"} name={"contenido"}onChange={onChange} resize='none' height={200} ></Textarea>
                            </HStack>
                    
                                <Button mb="2"
                                    variant="solid"
                                    colorScheme="blue"
                                    rounded="50"
                                    onClick={onSubmit}
                                    >
                                        ENVIAR
                                </Button>
                </Stack>
        </Box>
            </Flex>
)
}

export default AgregarMensaje

