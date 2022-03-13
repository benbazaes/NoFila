import { Center, Input, Stack, Button } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

const NavigationScreen = ({ navigation } : {navigation: any}) => {
  const {tokenUsuario, responseLogin, isLoading, signOut} = useSession();

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Image source={require("../sistema/assets/imagenes/noFilaLogo.png")} style={styles.image}></Image>
                <Button bg={'primary.100'} onPress={() => navigation.navigate('Leer Qr')}>Escanear QR</Button>
                <Button bg={'primary.100'} onPress={() => navigation.navigate('Fila Espera Cliente')}>Fila Espera Cliente</Button>
                <Button bg={'primary.100'} onPress={() => {signOut()} }>Cerrar Sesión</Button>
            </Stack>
        </Center>
    );
  };

  const styles = StyleSheet.create({
    image: {
      width: 400,
      height: 400,
      alignSelf:'center',
      marginBottom:-50
    },
  });

export default NavigationScreen;