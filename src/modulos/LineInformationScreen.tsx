import axios from 'axios';
import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

const LineInformationScreen = ({ navigation } : {navigation: any}) => {
    const {responseUserLogin, tokenUsuario} = useSession();
    const [descripcionServicio, setDescripcionServicio] = React.useState<string>('');
    const [atendidas, setAtendidas] = React.useState<string>('');
    const [noAtendidas, setNoAtendidas] = React.useState<string>('');
    const [tiempoEspera, setTiempoEspera] = React.useState<number>();

    React.useEffect(() => {
        cargarInformacionServicio();
        cargarInformacionFila();
    },[])

    const cargarInformacionServicio = async() => {
        await axios.get(`http://192.168.0.2:8000/api/servicios/${responseUserLogin.usuario.id_servicio}`,
          {
            headers:{
              'Authorization':`Bearer ${tokenUsuario}`
            }
          }
          )
          .then(response => {
              setDescripcionServicio(response.data[0].descripcion);
          })
          
          .catch(error => {
            console.log(error);
            Alert.alert(
              'Alerta',
              `Error al traer informacion de servicio.`,
              [
                { text: "OK" }
              ]
            )
            throw error;
          });
    }

    const cargarInformacionFila = async() => {
        await axios.post(`http://192.168.0.2:8000/api/informacionFila`, {
            'id_servicio': responseUserLogin.usuario.id_servicio
        },
          {
            headers:{
              'Authorization':`Bearer ${tokenUsuario}`
            }
          }
          )
          .then(response => {
                setNoAtendidas(response.data.usuariosFila[0].personasNoAtendidas)
                setAtendidas(response.data.usuariosAtendidos[0].personasAtendidas)
                setTiempoEspera(Math.round(response.data.tiempoEstimado[0].tiempo_espera))
                console.log('aqui dentro estamos',response.data.usuariosAtendidos[0].personasAtendidas);
          })
          
          .catch(error => {
            console.log(error);
            throw error;
          });
    }

    return (
        <ScrollView>
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.900"
                    borderWidth="1"
                    _dark={{
                    borderColor: "coolGray.900",
                    backgroundColor: "gray.500",
                    }}
                    _web={{
                    shadow: 2,
                    borderWidth: 0,
                    }}
                    _light={{
                    backgroundColor: "gray.50",
                    }}
                >
                    <Stack p="4" space={3}>
                        <VStack space={2}>
                        <Heading size="md" ml="-1">
                            Informe de Fila
                        </Heading>
                        <Text>Nombre de Servicio: {descripcionServicio}</Text>
                        <Text>Personas Atendidas: {atendidas} </Text>
                        <Text>Personas en fila: {noAtendidas}</Text>
                        <Text>Tiempo Estimado de Espera: {tiempoEspera} minutos</Text>
                        </VStack>
                        <HStack alignItems="center" space={4} justifyContent="space-between"/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
        </ScrollView>
    );
  };

export default LineInformationScreen;