import axios from 'axios';
import { Center, Stack, Button, Text, Box, Heading, HStack } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import { useBroadcast } from '../sistema/context/BroadcastContext';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

export type dataFilaType = {
  id: string,
  id_servicio: string,
  id_usuario:string,
  hora_inicio_atencion:string,
  hora_termino_atencion:string|null,
  numero_atencion:number,
  descripcion:string,
  id_sistema:string,
  id_estado_servicio:string,
};

const FilaEsperaClienteScreen = ({ route ,navigation } : {route: any, navigation: any}) => {
    const {xd} = route.params;
    const dataFila : dataFilaType = xd[0];
    const { tokenUsuario } = useSession();
    const { channel } = useBroadcast();
    const [usuariosFila, setUsuariosFila] = React.useState<number>();
    const [tiempoEspera, setTiempoEspera] = React.useState<number>();

    React.useEffect(() => {
      getUsersLineBefore();
    },[]);

    const getUsersLineBefore = async() => {
      await axios.post('http://192.168.0.2:8000/api/getUsersInLineBefore', {
        'id_servicio': dataFila.id,
        'numero_atencion': dataFila.numero_atencion,
      },
      {
        headers:{
          'Authorization':`Bearer ${tokenUsuario}`
        }
      }
      )
      .then(response => {
        setTiempoEspera(Math.round(response.data.data.tiempoEstimado[0].tiempo_espera));
        setUsuariosFila(response.data.data.usuariosFila[0].usuarioEnFilaAntes);
      })
      
      .catch(error => {
        console.log(error);
      });
    }
    

    channel.bind('pw3mqcqt', function(data:any) {
      getUsersLineBefore();
    });

    const onPressSalir = () => {
      Alert.alert(
        'Alerta',
        'Desea salir de la fila?',
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Sí", onPress: () => onSalir() }
        ]
      )
    }

    const onSalir = async() => {
      await axios.patch('http://192.168.0.2:8000/api/servicioCliente/endAtention', {
        'id_servicio': dataFila.id,
        'id_usuario': dataFila.id_usuario,
        'num_atencion_terminar': dataFila.numero_atencion,
      },
      {
        headers:{
          'Authorization':`Bearer ${tokenUsuario}`
        }
      }
      )
      .then(response => {
        navigation.navigate('No Fila Cliente')
        Alert.alert(
          'Alerta',
          'Se salio de la fila existosamente.',
          [
            { text: "OK" }
          ]
        )
      })
      
      .catch(error => {
        console.log(error);
      });
    }

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "89%", md: "25%",}}
            >
                <Box
                minW={"80"}
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.1000"
                borderWidth="5"
                _dark={{
                  borderColor: "coolGray.100",
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
                {
                  usuariosFila === 0 ?

                  <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="xl" ml="-1" color={'yellow.400'}>
                      Es su turno
                    </Heading>
                    <Heading size="md" ml="-1" color={'white'}>
                      Por favor dirijase a {dataFila.descripcion}, tiene 5 minutos antes que su numero de atencion quede invalido.
                    </Heading>
                  </Stack>
                  <HStack alignItems="center" space={4} justifyContent='center'>
                    <HStack>
                      <Button onPress={() => onPressSalir()}>Salir de Fila</Button>
                    </HStack>
                  </HStack>
                </Stack> : 
                <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    Numero de Atención
                  </Heading>
                  <Heading size="xl" ml="-1">
                    {dataFila.numero_atencion}
                  </Heading>
                </Stack>
                <Text alignSelf={'center'} fontWeight="400">
                  Servicio: {dataFila.descripcion}
                </Text>
                <Text alignSelf={'center'} fontWeight="400">
                  Hora entrada a la fila: {dataFila.hora_inicio_atencion}
                </Text>
                <Text alignSelf={'center'} fontWeight="400">
                  Personas en la fila: {usuariosFila}
                </Text>
                <Text alignSelf={'center'} fontWeight="400">
                  Tiempo estimado de espera: {tiempoEspera} minutos
                </Text>
                <HStack alignItems="center" space={4} justifyContent='center'>
                  <HStack>
                    <Button onPress={() => onPressSalir()}>Salir de Fila</Button>
                  </HStack>
                </HStack>
              </Stack>

                }

                </Box>
            </Stack>
        </Center>
    );
  };

export default FilaEsperaClienteScreen;