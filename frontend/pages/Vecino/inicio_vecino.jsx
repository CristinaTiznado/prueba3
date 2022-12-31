import { useState, useEffect } from "react";
import { Text, Box, Stack, Button, HStack, Card, CardHeader, CardBody, CardFooter} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

const Inicio_vecino = () => {
    const router = useRouter();
    const {
        query: { codigo },
    } = router;

    const props = {
        codigo,
    };

    const router1 = useRouter();

    const [vecino, setVecino] = useState([]);

    const setCookieFunction = (codigo) => {
        localStorage.setItem('codigo', codigo)
    }

    const getVecino = async () => {
        if(codigo){
            setCookieFunction(codigo)
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${props.codigo}`)
            setVecino(response.data);
        }else{
            const response = await axios.get(`${process.env.API_URL}/vecino/search/${localStorage.getItem('codigo')}`)
            setVecino(response.data);
        }
    };

    useEffect(() => {
        getVecino();
    }, []);

    const showVecino = () => {
        const arreglo = [vecino.nombre, vecino.apellido, vecino.vivienda, vecino.permiso]
        return (
            arreglo
        );
    };

    return (
        <Stack
            flexDirection = "column"
            width="150wh"
            height="auto"
            minH={"100vh"}
            backgroundColor = "blue.400"
            alignItems={"center"}
        >

            <HStack>
                <Text fontSize = {50} color = "white" mt = {30} mb = {30} as='b'>
                    INICIO
                </Text>
            </HStack>

            <Box width = {"100%"} >
                <Stack
                    spacing = {4}
                    p = "1rem"
                    backgroundColor = "whiteAlpha.900"
                    boxShadow = "md"
                    flexDir = "column"
                    mb = "10"
                    justifyContent = "center"
                    alignItems = "center"
                >
                    <HStack>
                        <Text as='b' fontSize = {30} color = "blue.500">
                            DATOS PERSONALES
                        </Text>
                    </HStack>

                    <Stack fontSize = {25} direction={['column', 'row']} spacing={20} >
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Nombre:</Text>
                            <Text>{showVecino()[0]+" "+showVecino()[1]}</Text>
                        </Stack>
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Vivienda:</Text>
                            <Text>{showVecino()[2]}</Text>
                        </Stack>
                        <Stack direction={['row']}>
                            <Text color = "blue.500" as='b'>Permiso:</Text>
                            <Text as='b' color='green' textTransform={'uppercase'}>{showVecino()[3]}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

                <Stack
                    direction={['column', 'row']}
                    p={5}
                    spacing={5}
                    backgroundColor={"whiteAlpha.900"}
                    width={"100%"}
                >
                    <Stack width={"100%"} >
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                        <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textTransform={'uppercase'} as='b'>Historial Reservas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue detallado de reservas anteriormente realizadas.</Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = {"solid"}
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push({pathname:'/Vecino/reservas_vecino', query:{codigo: vecino.codigo},})}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>

                    <Stack width={"100%"} >
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textAlign={'center'} textTransform={'uppercase'} as='b' >Multas</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue detallado de multas obtenidas a través del tiempo.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = "solid"
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push({pathname: '/Vecino/multas_vecino', query:{codigo: vecino.codigo},})}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>

                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900" textAlign={'center'} textTransform={'uppercase'} as='b' >Gastos</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue detallado de gastos anteriormente realizados al reservar servicios
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = "solid"
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Vecino/gastos_vecino")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>

                    <Stack width={"100%"}>
                    <Card rounded = "16" textAlign={'center'} backgroundColor="whiteAlpha.900" height={"full"}>
                    <CardHeader backgroundColor="blue.400" rounded = "16">
                            <Text color = "whiteAlpha.900"textAlign={'center'} textTransform={'uppercase'} as='b' >Mensajes</Text>
                        </CardHeader>

                        <CardBody>
                            <Text textAlign={'justify'}>
                            Despliegue de los mensajes enviados por administrador.
                            </Text>
                        </CardBody>

                        <CardFooter justifyContent={'center'}>
                            <Button
                                variant = "solid"
                                colorScheme = "blue"
                                width = {"80%"}
                                rounded = "50"
                                onClick = {() => router1.push("/Vecino/mensajes_vecino")}
                            >
                                Ingresar
                            </Button>
                        </CardFooter>
                    </Card>
                    </Stack>
                </Stack>
        </Stack>
    );
};

export default Inicio_vecino;