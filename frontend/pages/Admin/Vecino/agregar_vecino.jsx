import { useState, useEffect } from 'react'
import { Flex, Text, Box, Stack, Table, Thead,Tr,Td,Tbody, Button,VStack,HStack, Input} from "@chakra-ui/react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const AgregarVecino = () => {

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
            backgroundColor="blue.400"
            alignItems="center"
            >
              <Text fontSize={50} color="white" mt={30} mb={30}>Agregar Vecino</Text>
              <Box  minW={{ base: "10%", md: "468px"}} >
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
                  <HStack>
                    <VStack spacing={6}>
                      <Text color={"blue.400"} as="b">Nombre</Text>
                      <Text color={"blue.400"} as="b">Apellido</Text>
                      <Text color={"blue.400"} as="b"  >Rut</Text>
                      <Text color={"blue.400"} as="b" >Vivienda</Text>
                      <Text color={"blue.400"} as="b"  >Horas</Text>
                      <Text color={"blue.400"} as="b" >Permiso</Text>
                      <Text color={"blue.400"} as="b" >Codigo</Text>
                    </VStack>
                    <VStack>
                    <Input width={60} type={"text"} name={"nombre"} onChange={onChange} ></Input>
                    <Input width={60}  type={"text"} name={"apellido"} onChange={onChange}></Input>
                    <Input width={60} type={"text"} name={"rut"} onChange={onChange}></Input>
                    <Input width={60} type={"text"} name={"vivienda"} onChange={onChange}></Input>
                    <Input width={60} type={"text"} name={"horas"} onChange={onChange}></Input>
                    <Input width={60} type={"text"} name={"permiso"} onChange={onChange}></Input>
                    <Input width={60} type={"number"} name={"codigo"} onChange={onChange}></Input>
                    </VStack>
                    </HStack>
                          <Button mb="2"
                            variant="solid"
                            colorScheme="blue"
                            rounded="50"
                            onClick={onSubmit}
                            >
                          Agregar</Button>
                </Stack>
            </form>
        </Box>

            </Flex>
  )
}

export default AgregarVecino
