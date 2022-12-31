import { useState, useEffect } from 'react'
import { Flex, Text, Box, Stack, Button,VStack,HStack, Input, Select, Menu, MenuButton, MenuList,MenuItem } from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const AgregarVecino = () => {
  
  const router = useRouter();
  const [values, setValues]= useState({
    nombre:'',
    apellido:'',
    rut:'',
    vivienda:'',
    horas:'',
    permiso:'',
    codigo:''
  })

  const onChange = (e) => {

    if(e.target.name=="vivienda" || e.target.name=="horas"){
      if(e.target.value.length>2){
        e.target.value=e.target.value.substring(0,2);
      }
    }
    if(e.target.name=="codigo"){
      if(e.target.value.length>4){
        e.target.value=e.target.value.substring(0,4);
      }
    }

    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
    console.log(e.target.name,e.target.value);

}

const onSubmit= async(e) =>{
  e.preventDefault()
  console.log(values)

  try {

    const response = await axios.post(`${process.env.API_URL}/vecino`,values)
    console.log(response)

    if(response.status===201){
      Swal.fire({
        title:"Vecino Agregado",
        icon:'success',
        confirmButtonText:'OK'
      }).then(()=>{
        window.location.reload();
    })
    }
  } catch (error) {
    Swal.fire({
      title:"No se pudo agregar el vecino",
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
            <Button mt={10} name="atras" colorScheme="blue" as="b" rounded="40" style={{
            position: "fixed",
            top: "20px",
            left: "200px",
            zIndex: 1,
            }}
            onClick={()=>router.push("/Admin/Vecino/vecinos_admin")}>
            Volver atrás</Button>
              <Text fontSize={50} color="white" mt={30} mb={30}>Agregar Vecino</Text>
              <Box  minW={{ base: "10%", md: "468px"}} >
           
                <Stack spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                        rounded="16"
                        mb="2"
                        width={"full"}>
                          <HStack>
                          <Text color={"blue.400"} as="b">Nombre:</Text>
                          <Input width={"full"} type={"text"} maxLength={20} name={"nombre"} onChange={onChange} ></Input>
                          </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b">Apellido:</Text>
                      <Input width={"full"}  type={"text"} maxLength={20} name={"apellido"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b"  >Rut:</Text>
                      <Input width={"full"} type={"text"} maxLength={12} name={"rut"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Vivienda:</Text>
                      <Input width={"full"} type={"number"} maxLength={2} name={"vivienda"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b"  >Horas:</Text>
                      <Input width={"full"} type={"number"} maxLength={2} name={"horas"} onChange={onChange}></Input>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Permiso:</Text>
                      <Select width={"full"} placeholder='Permiso'  name="permiso" onChange={onChange}>
                        <option color={"blue.400"} as="b" >habilitado</option>
                        <option color={"blue.400"} as="b" >inhabilitado</option>
                      </Select>
                      </HStack>
                      <HStack>
                      <Text color={"blue.400"} as="b" >Codigo:</Text>
                      <Input width={"full"} type={"number"} maxLength={4} name={"codigo"} onChange={onChange}></Input>
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

export default AgregarVecino
