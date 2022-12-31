import { useState, useEffect } from 'react'
import { useDisclosure,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,Drawer,Flex, Text, Box, Stack,Button,VStack,HStack, Input, Select, Menu, MenuButton, MenuList,MenuItem, InputGroup, InputLeftElement  } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from "next/router";


const AgregarMulta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const today = new Date();
    const day = today.getDate();
    const month= today.getMonth();
    const year= today.getFullYear();
    const router = useRouter();

    const [values, setValues]= useState({
        valor:'',
        tipo:'',
        dia:day.toString(),
        mes:month.toString(),
        year:year.toString(),
        vecino:''
      })

  const onChange =  async(e) => {

    if(e.target.name == "vecino"){
      const response = await axios.get(`${process.env.API_URL}/vecino/search/${e.target.value}`)
      setValues({
          ...values,
          [e.target.name]:response.data._id
          })
          console.log(e.target.name,response.data._id);
  }else{

    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
    console.log(e.target.name,e.target.value);
  }
    
}


const [vecinos, setVecinos] = useState([])
    const getVecinos = async () => {
    const response = await axios.get(`${process.env.API_URL}/vecinos`)
    setVecinos(response.data)
    }

useEffect(() => {
  getVecinos()
}, []);


const showVecinos= () =>{
  return vecinos.map(vecinos =>{
    if(vecinos.estado=='activo')
    return (
      <option name="vecino" key={vecinos._id} value={vecinos.codigo}>{vecinos.nombre} {vecinos.apellido}</option>

    )
})
}

const onSubmit= async(e) =>{
  e.preventDefault()
  console.log(values)

  try {

    const response = await axios.post(`${process.env.API_URL}/multa/${vecino_select.value}`,values)
    console.log(response)

    if(response.status===201){
      Swal.fire({
        title:"Multa Realizada",
        icon:'success',
        confirmButtonText:'OK'
      }).then(()=>{
        window.location.reload();
    })
    }
  } catch (error) {
    Swal.fire({
      title:"No se pudo realizar la Multa",
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
            onClick={()=>router.push("/Admin/Multas/multas_admin")}>
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

              <Text fontSize={50} color="white" mt={30} mb={30}>Multar Vecino</Text>
              <Box  minW={{ base: "10%", md: "468px"}} >
                <Stack spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                        rounded="16"
                        flexDir="column"
                        mb="2"
                        justifyContent="left"
                        alignItems="left">
                    <HStack mt={6}>
                      <Text color={"blue.400"} as="b" >Fecha</Text>
                      <Text width={"full"}>{day}/{month}/{year}</Text>
                      </HStack>
                    <HStack>
                    <Text color={"blue.400"} as="b" >Vecino</Text>
                    <Select  id="vecino_select" placeholder='Vecinos' name="vecino" onChange={onChange}>
                    {showVecinos()}
                      </Select>
                    </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Tipo</Text>
                      <Select placeholder='Tipo de Multa'  name="tipo" onChange={onChange}>
                        <option color={"blue.400"} as="b" >sancion leve</option>
                        <option color={"blue.400"} as="b" >sancion media</option>
                        <option color={"blue.400"} as="b" >sancion alta</option>
                        <option color={"blue.400"} as="b" >por cancelacion</option>
                      </Select>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b">Valor</Text>
                      <InputGroup>
                      <InputLeftElement
                      pointerEvents='none'
                      fontSize='1.2em'
                      children='$'
                      />
                      <Input width={60} type={"text"} name={"valor"}onChange={onChange} ></Input>
                      </InputGroup>
                      
                      </HStack>
                          <Button mb="2"
                            variant="solid"
                            colorScheme="blue"
                            rounded="50"
                            onClick={onSubmit}
                            >
                          Agregar</Button>
                </Stack>
        </Box>

            </Flex>
  )
}
export default AgregarMulta
