import axios from 'axios';
import { Center, Input, Stack, Button, Text, Box, Heading, HStack } from 'native-base';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useBroadcast } from '../sistema/context/BroadcastContext';
import { useSession } from '../sistema/context/SessionContext';
import { react } from '@babel/types';

export type credendencialType = {
    correo: string,
    password:string
};

export type dataFilaType = {
  id_usuario: string,
  hora_inicio_atencion: string,
  numero_atencion: number,
  servicio: servicioType,
  tiempo_estimado: tiempo[],
};

export type tiempo = {
  tiempo_espera: number,
};

export type servicioType = {
  id: string,
  descripcion: string,
  id_sistema: string,
  id_estado_servicio: string,
};

const FilaEsperaClienteScreen = ({ route ,navigation } : {route: any, navigation: any}) => {
    const {xd} = route.params;
    const dataFila : dataFilaType = xd.data;
    const { tokenUsuario } = useSession();
    const { channel } = useBroadcast();
    const [usuariosFila, setUsuariosFila] = React.useState<string>();
    const [tiempoEspera, setTiempoEspera] = React.useState<number>();

    React.useEffect(() => {
      if(!!dataFila){
        setTiempoEspera(Math.round(dataFila.tiempo_estimado[0].tiempo_espera));
      }
    },[])
    

    channel.bind('my-event', function(data:any) {
      setTiempoEspera(Math.round(data.message.tiempoEstimado[0].tiempo_espera));
      setUsuariosFila(data.message.usuariosFila[0].usuarioEnFila)
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
        'id_servicio': dataFila.servicio.id,
        'id_usuario': dataFila.id_usuario,
        'num_atencion': dataFila.numero_atencion,
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
                    Servicio: {dataFila.servicio.descripcion}
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
                </Box>
            </Stack>
        </Center>
    );
  };

export default FilaEsperaClienteScreen;