import axios from 'axios';
import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';
import GenerateQRScreen from './GenerateQRScreen';

export type credendencialType = {
    correo: string,
    password:string
};

const LineVisualScreen = ({ navigation } : {navigation: any}) => {
    const {responseUserLogin, tokenUsuario} = useSession();
    const [flag, setFlag] = React.useState<boolean>(false);
    const [loading, setloading] = React.useState<boolean>(false);
    const [lista, setLista] = React.useState<any>([]);
    const [descripcionServicio, setDescripcionServicio] = React.useState<string>('');

    React.useEffect(() => {
        cargarListadoFila();
        cargarInformacionServicio();
        cargarEstadoFila();
    },[])

    const cargarListadoFila = async() => {
        await axios.post(`http://192.168.0.2:8000/api/listarFila`, {
            'id_servicio': responseUserLogin.usuario.id_servicio
        },
          {
            headers:{
              'Authorization':`Bearer ${tokenUsuario}`
            }
          }
          )
          .then(response => {
                setLista(response.data)
                console.log('aqui dentro estamos',response.data);
          })
          
          .catch(error => {
            console.log(error);
            throw error;
          });
    }

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
                console.log(response.data[0].descripcion);
          })
          
          .catch(error => {
            console.log(error);
            Alert.alert(
              'Alerta',
              `Error al cambiar de estado la fila.`,
              [
                { text: "OK" }
              ]
            )
            throw error;
          });
    }

    const cargarEstadoFila = async() => {
        await axios.post('http://192.168.0.2:8000/api/estadoFila', {
            'id_servicio': responseUserLogin.usuario.id_servicio,
          },
          {
            headers:{
              'Authorization':`Bearer ${tokenUsuario}`
            }
          }
          )
          .then(response => {
              if(response.data.data[0].estado === 1){
                  setFlag(false);
              }else {
                  setFlag(true)
              }    
                console.log(response.data.data[0].estado);
          })
          
          .catch(error => {
            console.log(error);
            Alert.alert(
              'Alerta',
              `Error al cambiar de estado la fila.`,
              [
                { text: "OK" }
              ]
            )
            throw error;
          });
    }

    const handleEstadoFila = async() => {
        await axios.put('http://192.168.0.2:8000/api/cambiarEstadoFila', {
            'id_usuario': responseUserLogin.usuario.id,
            'id_servicio': responseUserLogin.usuario.id_servicio,
          },
          {
            headers:{
              'Authorization':`Bearer ${tokenUsuario}`
            }
          }
          )
          .then(response => {    
                console.log(response.data);
                cargarEstadoFila();
          })
          
          .catch(error => {
            console.log(error);
            Alert.alert(
              'Alerta',
              `Error al cambiar de estado la fila.`,
              [
                { text: "OK" }
              ]
            )
            throw error;
          });
    }

    const handleSiguienteTurno = async() => {
        await axios.patch('http://192.168.0.2:8000/api/servicioCliente/endAtention', {
            'num_atencion_terminar': lista[0].numero_atencion,
            'id_usuario': lista[0].id_usuario,
            'id_servicio': responseUserLogin.usuario.id_servicio,
          },
          {
            headers:{
              'Authorization':`Bearer ${tokenUsuario}`
            }
          }
          )
          .then(response => {    
                console.log(response.data);
                cargarListadoFila()
          })
          
          .catch(error => {
            console.log(error);
            Alert.alert(
              'Alerta',
              `Error al pasar a siguiente turno.`,
              [
                { text: "OK" }
              ]
            )
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
                        <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {descripcionServicio}
                        </Heading>
                        <Text
                            fontSize="xs"
                            _light={{
                            color: "black",
                            }}
                            _dark={{
                            color: "black",
                            }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1"
                            alignSelf={'center'}
                        >
                            Activar o desactivar fila
                        </Text>
                        </Stack>
                        <Button bg={'primary.100'} onPress={() => handleEstadoFila()}>{!!flag ? 'Activar Fila' : 'Desactivar Fila'}</Button>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                        </HStack>
                    </Stack>
                </Box>
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
                            Turno Proximos
                        </Heading>
                        {lista.length === 0 ?
                            <VStack
                            w="100%"
                            justifyContent="space-between"
                            alignItems="center"
                            >
                                <Heading color={'white'}>
                                Fila Vacía
                                </Heading>
                            </VStack> :
                             lista.map((x:any) => (
                                <VStack
                                w="100%"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                    <Heading color={'white'}>
                                    {x.numero_atencion}
                                    </Heading>
                                </VStack>
                                
                            ))
                        }
                        </VStack>
                        <HStack alignItems="center" space={4} justifyContent="space-between"/>
                        <Button bg={'primary.100'} onPress={() => handleSiguienteTurno()}>Siguiente Turno</Button>
                        <HStack alignItems="center" space={4} justifyContent="space-between"/>
                    </Stack>
                </Box> 
                
            </Stack>
        </Center>
        </ScrollView>
    );
  };

export default LineVisualScreen;