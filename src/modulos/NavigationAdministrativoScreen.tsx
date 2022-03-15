import { Center, Input, Stack, Button, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

const NavigationAdministrativoScreen = ({ navigation } : {navigation: any}) => {
  const {signOut} = useSession();

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Image source={require("../sistema/assets/imagenes/noFilaLogo.png")} alt={'logo'} style={styles.image}></Image>
                <Button  onPress={() => navigation.navigate('Fila')}>Visualizar Fila</Button>
                <Button  onPress={() => navigation.navigate('Informacion Fila')}>Informacion Fila</Button>
                <Button  onPress={() => navigation.navigate('Generar Qr')}>Generar QR</Button>
                <Button bg={'primary.100'} onPress={() => signOut() }>Cerrar Sesión</Button>
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

export default NavigationAdministrativoScreen;