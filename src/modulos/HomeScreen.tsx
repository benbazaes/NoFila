import { Center, Input, Stack, Button, Image } from 'native-base';
import React from 'react';
import { SessionContext } from '../sistema/context/SessionContext';
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';

export type credendencialType = {
    correo: string,
    password:string
};

const HomeScreen = ({ navigation } : {navigation: any}) => {
    const [show, setShow] = React.useState<boolean>(false);
    const [credenciales, setCredenciales] = React.useState<credendencialType>({correo:'', password: ''});

    const { signIn } = React.useContext(SessionContext);

    const handleClick = () => setShow(!show)

    const handleOnChange = (name:string, value: string) => {
        setCredenciales({...credenciales, [name]:value});
    }

    const img = require('../sistema/assets/imagenes/noFilaLogo.png')

    return (
        <ScrollView>
        <KeyboardAvoidingView
            style={styles.container}
        >
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Image source={require("../sistema/assets/imagenes/noFilaLogo.png")} style={styles.image} alt="imagen de aplicacion"></Image>
                <Input variant="outline" placeholder="Correo" size='xl' onChangeText={(event) => handleOnChange('correo',event)} value={credenciales.correo}/>
                <Input
                    type={show ? "text" : "password"}
                    size='xl'
                    InputRightElement={
                    <Button size="3xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                    {show ? "Ocultar" : "Ver"}
                    </Button>
                    }
                    onChangeText={(event) => handleOnChange('password',event)} 
                    value={credenciales.password}
                    placeholder="Contraseña"
                />
                <Button onPress={() => signIn(credenciales)}>Iniciar Sesion</Button>
                <Button>Registrar Usuario</Button>
            </Stack>
        </Center>
        </KeyboardAvoidingView>
        </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 3
    },
    image: {
      width: 400,
      height: 400,
      alignSelf:'center',
      marginBottom:-50
    },
  });

export default HomeScreen;