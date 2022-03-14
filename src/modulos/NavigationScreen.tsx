import axios from 'axios';
import { Center, Input, Stack, Button, Modal, FormControl, Select, CheckIcon, VStack, HStack, Text } from 'native-base';
import React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

const NavigationScreen = ({ navigation } : {navigation: any}) => {
  const {tokenUsuario, responseUserLogin, isLoading, signOut} = useSession();
  const [openDialogSeleccion, setOpenDialogSeleccion] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<any>([]);
  const [userSelect, setUserSelect] = React.useState<any>([]);
  const [position, setPosition] = React.useState<any>();

  React.useEffect(() => {
    if(isLoading){
      console.log(responseUserLogin.usuario.id);
    }
    
  },[])

const getDataUserLine = async() => {
  await axios.post('http://192.168.0.2:8000/api/getUserLineData', {
    'id_usuario': responseUserLogin.usuario.id,
  },
  {
    headers:{
      'Authorization':`Bearer ${tokenUsuario}`
    }
  }
  )
  .then(response => {    
    if (response.data.data.length > 1) {
      setOpenDialogSeleccion(true);
      setUserSelect(response.data.data);
    } else { 
      console.log(response.data.data);
      
      navigation.navigate('Fila Espera Cliente Turno Previo', {
        xd: response.data.data
      });
    }
  })
  
  .catch(error => {
    console.log(error);
    Alert.alert(
      'Alerta',
      `No tiene numero de atencion tomada.`,
      [
        { text: "OK" }
      ]
    )
    throw error;
  });
}

    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Image source={require("../sistema/assets/imagenes/noFilaLogo.png")} style={styles.image}></Image>
                <Button bg={'primary.100'} onPress={() => navigation.navigate('Leer Qr')}>Escanear QR</Button>
                <Button bg={'primary.100'} onPress={() => getDataUserLine()}>Fila Espera Cliente</Button>
                <Button bg={'primary.100'} onPress={() => signOut() }>Cerrar Sesión</Button>

                <Modal isOpen={openDialogSeleccion} onClose={() => setOpenDialogSeleccion(false)}>
                <Modal.CloseButton />
                <Modal.Header>Servicios</Modal.Header>
                <Modal.Content>
                <Modal.Body>
                <FormControl>
                <FormControl.Label>Esta inscrito en dos filas, seleccione uno.</FormControl.Label>
                <Select 
                  selectedValue={position} 
                  mx={{base: 0, md: "auto"}} 
                  accessibilityLabel="Select a position for Popover" 
                  onValueChange={nextValue => {setPosition(nextValue); setUserData(userSelect.filter((x:any) => x.id_servicio === nextValue)); console.log(userData);
}} 
                  _selectedItem={{bg: "cyan.600",marginTop:'5', marginBottom:'5', endIcon: <CheckIcon size={4} />}}>
                {userSelect.map((x:any) => {
                  return(
                    <Select.Item label={x.descripcion} value={x.id_servicio} />
                  )
                })}
                </Select>
                </FormControl>
                </Modal.Body>
                <Modal.Footer>
                <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setOpenDialogSeleccion(false);
                }}>
                Cancel
                </Button>
                <Button onPress={() => {
                setOpenDialogSeleccion(false);
                navigation.navigate(
                  'Fila Espera Cliente Turno Previo', {
                    xd : userData
                  }
                )
                }}>
                Ir
                </Button>
                </Button.Group>
                </Modal.Footer>
                </Modal.Content>
                </Modal>
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