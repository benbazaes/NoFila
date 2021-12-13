import { Center, Input, Stack, Button } from 'native-base';
import React from 'react';
import { SessionContext } from '../sistema/context/SessionContext';

const HomeScreen = ({ navigation } : {navigation: any}) => {
    const [show, setShow] = React.useState<boolean>(false);

    const { signIn } = React.useContext(SessionContext);

    const handleClick = () => setShow(!show)

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Input variant="outline" placeholder="Correo" size='xl'/>
                <Input
                    type={show ? "text" : "password"}
                    size='xl'
                    InputRightElement={
                    <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                    }
                    placeholder="Contraseña"
                />
                <Button onPress={signIn}>Iniciar Session</Button>
                <Button
                onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
                >Go to Jane's profile</Button>
            </Stack>
        </Center>
    );
  };

export default HomeScreen;