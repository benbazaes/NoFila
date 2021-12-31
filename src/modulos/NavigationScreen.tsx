import { Center, Input, Stack, Button } from 'native-base';
import React from 'react';
import GenerateQRScreen from './GenerateQRScreen';
import QRScreen from './QRScreen';

export type credendencialType = {
    correo: string,
    password:string
};

const NavigationScreen = ({ navigation } : {navigation: any}) => {

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Button onPress={() => navigation.navigate(QRScreen)}>Escanear QR</Button>
            </Stack>
        </Center>
    );
  };

export default NavigationScreen;