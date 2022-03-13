import { Center, Input, Stack, Button, Image, Modal, FormControl } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export type credendencialType = {
    correo: string,
    password:string
};

const NavigationAdministratorScreen = ({ navigation } : {navigation: any}) => {

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Image source={require("../sistema/assets/imagenes/noFilaLogo.png")} style={styles.image}></Image>
                <Button  onPress={() => navigation.navigate('Gestionar Administrativo')}>Gestionar Administrativo</Button>
                <Button  onPress={() => navigation.navigate('Gestionar Cliente')}>Gestionar Cliente</Button>
                <Button  onPress={() => navigation.navigate('Gestionar Sistema')}>Gestionar Sistema</Button>
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

export default NavigationAdministratorScreen;