import { Center, Input, Stack, Button, Text } from 'native-base';
import React from 'react';

export type credendencialType = {
    correo: string,
    password:string
};

const FilaEsperaClienteScreen = ({ route ,navigation } : {route: any, navigation: any}) => {
    const {xd} = route.params;
    const fechaInicio = new Date(xd.hora_inicio_atencion);

    console.log(fechaInicio);
    

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Text>Se encuentra en la posición:</Text>
                <Text>{xd.numero_atencion}</Text>
                <Text>Hora entrada a la fila</Text>
                <Text>{fechaInicio.toLocaleTimeString('es')}</Text>
            </Stack>
        </Center>
    );
  };

export default FilaEsperaClienteScreen;