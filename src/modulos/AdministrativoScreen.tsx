import axios from 'axios';
import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView, Divider, Modal, FormControl, View, Select, CheckIcon } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

export type userInputDataType = {
  nombre: string,
  apellido: string,
  telefono: string,
  correo: string,
  id_estado_administrador: string,
  contraseña: string,
  id_rol_usuario: string,
  servicios: string,
}

const AdministrativoScreen = ({ navigation } : {navigation: any}) => {
  const {tokenUsuario, responseUserLogin, isLoading, signOut} = useSession();
  const [userData, setUserData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>();
  const [servicioData, setServicioData] = React.useState<any>([]);
  const [position, setPosition] = React.useState<any>();
  const [userServicio, setUserServicio] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [showModalEditar, setShowModalEditar] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>();
  const [usuarioIdEditar, setUsuarioIdEditar] = React.useState<string>();
  const [userInputData, setUserInputData] = React.useState<userInputDataType>({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    id_estado_administrador: '59d38c6d-2a78-4d62-bc82-6455a6e71d5c',
    contraseña: '',
    id_rol_usuario: 'cfbb7ff6-6c59-11ec-9eb4-f02f741864f7',
    servicios: '',
  });

  const [userEditData, setUserEditData] = React.useState<userInputDataType>({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    id_estado_administrador: '59d38c6d-2a78-4d62-bc82-6455a6e71d5c',
    contraseña: '',
    id_rol_usuario: 'cfbb7ff6-6c59-11ec-9eb4-f02f741864f7',
    servicios: '',
  });

  React.useEffect(() => {
    obtenerAdministrativos();
    obtenerServicios();
  },[]);

  const eliminarAdministrativo = async(value:string) => {
    console.log(value);
    
    await axios.delete(`http://192.168.0.2:8000/api/eliminarAdministrativo/${value}`,
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      obtenerAdministrativos()
      setLoading(false);
    })
    
    .catch(error => {
      console.log(error.response.data);
      setLoading(false);
      Alert.alert(
        'Alerta',
        `Error al eliminar administrativo.`,
        [
          { text: "OK" }
        ]
      )
      throw error;
    });
  }

  const obtenerAdministrativoEditar = async(value:string) => {
    await axios.post('http://192.168.0.2:8000/api/getUsuariosAdministrativos',
    {
      'nombre':value
    },
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      setUserEditData({
        nombre:response.data[0].nombre,
        apellido:response.data[0].apellido,
        telefono:response.data[0].telefono,
        correo:response.data[0].correo,
        id_estado_administrador:response.data[0].id_estado_administrador,
        contraseña:response.data[0].password,
        id_rol_usuario:response.data[0].id_rol_usuario,
        servicios:response.data[0].id_servicio,

      });
      setUsuarioIdEditar(response.data[0].id);
      setPosition(response.data[0].id_servicio);
      setLoading(false);
      setShowModalEditar(true)
    })
    
    .catch(error => {
      console.log(error);
      setLoading(false);
      Alert.alert(
        'Alerta',
        `Error al traer administrativos.`,
        [
          { text: "OK" }
        ]
      )
      throw error;
    });
  }

  const handleOnGuardarEditar = async() => {
    console.log(userEditData);
    
    await axios.put(`http://192.168.0.2:8000/api/actualizarAdministrativo/${usuarioIdEditar}`,
    {
      'nombre':userEditData.nombre,
      'apellido':userEditData.apellido,
      'telefono':userEditData.telefono,
      'correo':userEditData.correo,
      'id_estado_administrador':userEditData.id_estado_administrador,
      'password':userEditData.contraseña,
      'id_rol_usuario':userEditData.id_rol_usuario,
      'id_servicio':userEditData.servicios,
    },
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      console.log(response.data);
      setShowModalEditar(false);
      obtenerAdministrativos();
      setUserInputData({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        id_estado_administrador: '59d38c6d-2a78-4d62-bc82-6455a6e71d5c',
        contraseña: '',
        id_rol_usuario: 'cfbb7ff6-6c59-11ec-9eb4-f02f741864f7',
        servicios: '',
      })

      Alert.alert(
        'Alerta',
        `Guardado Exitosamente.`,
        [
          { text: "OK" }
        ]
      )
      
    })
    
    .catch(error => {
      console.log(error.response.data);
      Alert.alert(
        'Alerta',
        `Error al guardar.`,
        [
          { text: "OK" }
        ]
      )
      throw error;
    });
    }
  
  const obtenerAdministrativos = async() => {
    setLoading(true)
      await axios.post('http://192.168.0.2:8000/api/getUsuariosAdministrativos',
      {
        'nombre':query
      },
      {
        headers:{
          'Authorization':`Bearer ${tokenUsuario}`
        }
      }
      )
      .then(response => {    
        setUserData(response.data);
        setLoading(false);
      })
      
      .catch(error => {
        console.log(error);
        setLoading(false);
        Alert.alert(
          'Alerta',
          `Error al traer administrativos.`,
          [
            { text: "OK" }
          ]
        )
        throw error;
      });
  };

  const obtenerServicios = async() => {
    await axios.get('http://192.168.0.2:8000/api/servicios',
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      console.log('servicios',response.data.servicio);
      setServicioData(response.data.servicio);
      
    })
    
    .catch(error => {
      console.log(error);
      Alert.alert(
        'Alerta',
        `Error al trear administrativos.`,
        [
          { text: "OK" }
        ]
      )
      throw error;
    });
};

const handleOnGuardar = async() => {
  await axios.post('http://192.168.0.2:8000/api/crearAdministrativo',
    {
      'nombre':userInputData.nombre,
      'apellido':userInputData.apellido,
      'telefono':userInputData.telefono,
      'correo':userInputData.correo,
      'id_estado_administrador':userInputData.id_estado_administrador,
      'password':userInputData.contraseña,
      'id_rol_usuario':userInputData.id_rol_usuario,
      'id_servicio':userInputData.servicios,
    },
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      console.log(response.data);
      setShowModal(false);
      obtenerAdministrativos();
      setUserInputData({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        id_estado_administrador: '59d38c6d-2a78-4d62-bc82-6455a6e71d5c',
        contraseña: '',
        id_rol_usuario: 'cfbb7ff6-6c59-11ec-9eb4-f02f741864f7',
        servicios: '',
      })

      Alert.alert(
        'Alerta',
        `Guardado Exitosamente.`,
        [
          { text: "OK" }
        ]
      )
      
    })
    
    .catch(error => {
      console.log(error);
      Alert.alert(
        'Alerta',
        `Error al guardar.`,
        [
          { text: "OK" }
        ]
      )
      throw error;
    });
}

const handleOnChange = (name:string, value: string) => {
  setUserInputData({...userInputData!, [name]:value});
  console.log(userInputData);
}

const handleOnChangeEdit = (name:string, value: string) => {
  setUserEditData({...userEditData!, [name]:value});
  console.log(userEditData);
}

const handleOnChangeQuery = (value: string) => {
  setQuery(value);
  console.log(query);
}

const handleEditar = (value:string) =>{
  console.log(value);
  obtenerAdministrativoEditar(value);
  
}

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button bg={'white'} onPress={() => {setShowModal(true)}}>Agregar</Button>
          )
        })
      },[navigation]);

    return (
        <>
        <Input
            type={"text"}
            marginTop={'2'}
            alignSelf={'center'}
            maxW={'80'}
            size='xl'
            onChangeText={(event) => handleOnChangeQuery(event)} value={query}
            InputRightElement={
            <Button size="3xs" rounded="none" w="1/6" h="full" onPress={() => obtenerAdministrativos()}>
                Buscar
            </Button>
            }
            placeholder="Buscar por nombre..."
        />
        <ScrollView>
        <Center>
            {!!loading ? <></> : userData.map((item:any, itemI:any) => (
                <Box
                key={itemI}
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
                      {item.nombre} {item.apellido}
                    </Heading>
                  </Stack>
                  <Text fontWeight="400">
                    Telefono: {item.telefono}
                  </Text>
                  <Text fontWeight="400">
                    Correo: {item.correo}
                  </Text>
                  <HStack alignItems="center" space={4} justifyContent='flex-end'>
                    <HStack alignItems="flex-start">
                      <Button onPress={() => handleEditar(item.nombre)}>Editar</Button>
                    </HStack>
                    <HStack alignItems="flex-start">
                      <Button onPress={() => eliminarAdministrativo(item.id)}>Eliminar</Button>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            ))}
        </Center>
        </ScrollView>
        <Modal backdropVisible={true} _backdrop={{
            bg: "primary.900",
          }} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Agregar Administrativo</Modal.Header>
        <Modal.Body>
            <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input placeholder='Nombre' onChangeText={(event) => handleOnChange('nombre',event)} value={userInputData?.nombre} backgroundColor={'white'}/>
            </FormControl>
            <FormControl>
            <FormControl.Label>Apellido</FormControl.Label>
            <Input placeholder='Apellido' onChangeText={(event) => handleOnChange('apellido',event)} value={userInputData?.apellido} backgroundColor={'white'}/>
            </FormControl>
            <FormControl>
            <FormControl.Label>Telefono</FormControl.Label>
            <Input placeholder='Telefono' onChangeText={(event) => handleOnChange('telefono',event)} value={userInputData?.telefono} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Correo</FormControl.Label>
            <Input placeholder='Correo' onChangeText={(event) => handleOnChange('correo',event)} value={userInputData?.correo} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input placeholder='Contraseña' onChangeText={(event) => handleOnChange('contraseña',event)} value={userInputData?.contraseña} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Servicios</FormControl.Label>
            <Select 
              backgroundColor={'white'}
              placeholder='servicios'
              selectedValue={position} 
              mx={{base: 0, md: "auto"}} 
              accessibilityLabel="Select a position for Popover" 
              onValueChange={nextValue => {setUserInputData({...userInputData!,['servicios']:nextValue});setPosition(nextValue); setUserServicio(servicioData.filter((x:any) => x.id_servicio === nextValue)); console.log(userInputData);
}} 
              _selectedItem={{bg: "cyan.600",marginTop:'5', marginBottom:'5', endIcon: <CheckIcon size={4} />}}>
            {servicioData.map((x:any) => {
              return(
                <Select.Item label={x.descripcion} value={x.id} />
              )
            })}
            </Select>
            </FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button.Group space={2}>
                <Button
                    variant='solid'
                    onPress={() => {
                    setShowModal(false)
                    }}
                >
                    Cerrar
                </Button>
                <Button
                    onPress={() => {
                    handleOnGuardar()
                    }}
                >
                    Guardar
                </Button>
                </Button.Group>
            </Modal.Footer>
            </Modal.Content>
            </Modal>

            <Modal backdropVisible={true} _backdrop={{
            bg: "primary.900",
          }} isOpen={showModalEditar} onClose={() => setShowModalEditar(false)}>
        <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Editar Administrativo</Modal.Header>
        <Modal.Body>
            <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input placeholder='Nombre' onChangeText={(event) => handleOnChangeEdit('nombre',event)} value={userEditData?.nombre} backgroundColor={'white'}/>
            </FormControl>
            <FormControl>
            <FormControl.Label>Apellido</FormControl.Label>
            <Input placeholder='Apellido' onChangeText={(event) => handleOnChangeEdit('apellido',event)} value={userEditData?.apellido} backgroundColor={'white'}/>
            </FormControl>
            <FormControl>
            <FormControl.Label>Telefono</FormControl.Label>
            <Input placeholder='Telefono' onChangeText={(event) => handleOnChangeEdit('telefono',event)} value={userEditData?.telefono} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Correo</FormControl.Label>
            <Input placeholder='Correo' onChangeText={(event) => handleOnChangeEdit('correo',event)} value={userEditData?.correo} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Servicios</FormControl.Label>
            <Select 
              selectedValue={position} 
              backgroundColor={'white'}
              mx={{base: 0, md: "auto"}} 
              accessibilityLabel="Select a position for Popover" 
              onValueChange={nextValue => {setUserEditData({...userEditData!,['servicios']:nextValue});setPosition(nextValue); setUserServicio(servicioData.filter((x:any) => x.id_servicio === nextValue)); console.log(userInputData);
}} 
              _selectedItem={{bg: "cyan.600",marginTop:'5', marginBottom:'5', endIcon: <CheckIcon size={4} />}}>
            {servicioData.map((x:any) => {
              return(
                <Select.Item label={x.descripcion} value={x.id} />
              )
            })}
            </Select>
            </FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button.Group space={2}>
                <Button
                    variant='solid'
                    onPress={() => {
                    setShowModalEditar(false)
                    }}
                >
                    Cerrar
                </Button>
                <Button
                    onPress={() => {
                    handleOnGuardarEditar()
                    }}
                >
                    Guardar
                </Button>
                </Button.Group>
            </Modal.Footer>
            </Modal.Content>
            </Modal>
        </>
    );
  };

export default AdministrativoScreen;