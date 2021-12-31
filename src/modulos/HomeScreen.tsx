import { Center, Input, Stack, Button } from 'native-base';
import React from 'react';
import { SessionContext } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

const HomeScreen = ({ navigation } : {navigation: any}) => {
    const [show, setShow] = React.useState<boolean>(false);
    const [credenciales, setCredenciales] = React.useState<credendencialType>({correo:'', password: ''});
    const [correo, setCorreo] = React.useState<string>('');

    const { signIn } = React.useContext(SessionContext);

    const handleClick = () => setShow(!show)

    const handleOnChange = (name:string, value: string) => {
        setCredenciales({...credenciales, [name]:value});
        console.log(credenciales);
    }

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Input variant="outline" placeholder="Correo" size='xl' onChangeText={(event) => handleOnChange('correo',event)} value={credenciales.correo}/>
                <Input
                    type={show ? "text" : "password"}
                    size='xl'
                    InputRightElement={
                    <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                    }
                    onChangeText={(event) => handleOnChange('password',event)} 
                    value={credenciales.password}
                    placeholder="Contraseña"
                />
                <Button onPress={() => signIn(credenciales)}>Iniciar Session</Button>
            </Stack>
        </Center>
    );
  };

export default HomeScreen;