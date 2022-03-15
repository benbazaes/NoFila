import axios from 'axios';
import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView, Divider, Modal, FormControl, View, Select, CheckIcon } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import { useSession } from '../sistema/context/SessionContext';

export type credendencialType = {
    correo: string,
    password:string
};

export type sistemaInputDataType = {
  nombre: string,
  id_categoria: string,
  id_estado: string,
}

const SistemaScreen = ({ navigation } : {navigation: any}) => {
  const {tokenUsuario, responseUserLogin, isLoading, signOut} = useSession();
  const [sistemaData, setSistemaData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>();
  const [servicioData, setServicioData] = React.useState<any>([]);
  const [position, setPosition] = React.useState<any>();
  const [userServicio, setUserServicio] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [showModalEditar, setShowModalEditar] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>();
  const [usuarioIdEditar, setUsuarioIdEditar] = React.useState<string>();
  const [userInputData, setUserInputData] = React.useState<sistemaInputDataType>({
    nombre: '',
    id_categoria: '',
    id_estado: '245bb2e7-5324-11ec-a82c-f02f741864f7',
  });

  const [sistemaEditData, setSistemaEditData] = React.useState<sistemaInputDataType>({
    nombre: '',
    id_categoria: '',
    id_estado: '245bb2e7-5324-11ec-a82c-f02f741864f7',
  });

  React.useEffect(() => {
    obtenerSistema();
    obtenerCategoria();
  },[]);

  const eliminarAdministrativo = async(value:string) => {
    console.log(value);
    
    await axios.delete(`http://192.168.0.2:8000/api/eliminaSistema/${value}`,
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      console.log(response);
      
      obtenerSistema()
      setLoading(false);
    })
    
    .catch(error => {
      console.log(error.response.data);
      setLoading(false);
      Alert.alert(
        'Alerta',
        `Error al eliminar sistema.`,
        [
          { text: "OK" }
        ]
      )
      throw error;
    });
  }

  const obtenerSistemaEditar = async(value:string) => {
    await axios.post('http://192.168.0.2:8000/api/obtenerSistema',
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
      setSistemaEditData({
        nombre:response.data.sistema[0].nombre,
        id_categoria:response.data.sistema[0].id_categoria,
        id_estado:response.data.sistema[0].id_estado,

      });
      setUsuarioIdEditar(response.data.sistema[0].id);
      setPosition(response.data.sistema[0].id_categoria);
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

  const obtenerCategoria = async() => {
    await axios.get('http://192.168.0.2:8000/api/categoriaSistema',
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {
      setServicioData(response.data.categoria_sistema)
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
    await axios.put(`http://localhost:8000/api/actualizarSistema/${usuarioIdEditar}`,
    {
      'nombre':sistemaEditData.nombre,
      'id_categoria':sistemaEditData.id_categoria,
      'id_estado':sistemaEditData.id_estado,
    },
    {
      headers:{
        'Authorization':`Bearer ${tokenUsuario}`
      }
    }
    )
    .then(response => {    
      setShowModalEditar(false);
      obtenerSistema();
      setUserInputData({
        nombre: '',
        id_categoria: '',
        id_estado: '',
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
      console.log(error.response);
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
  
  const obtenerSistema = async() => {
    setLoading(true)
      await axios.post('http://192.168.0.2:8000/api/obtenerSistema',
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
        setSistemaData(response.data.sistema);
        setLoading(false);
      })
      
      .catch(error => {
        console.log(error.response.data);
        setLoading(false);
        Alert.alert(
          'Alerta',
          `Error al traer sistemas.`,
          [
            { text: "OK" }
          ]
        )
        throw error;
      });
  };

const handleOnGuardar = async() => {
  await axios.post('http://192.168.0.2:8000/api/sistema',
    {
      'nombre':userInputData.nombre,
      'id_categoria':userInputData.id_categoria,
      'id_estado':userInputData.id_estado,
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
      obtenerSistema();
      setUserInputData({
        nombre: '',
        id_categoria: '',
        id_estado: '',
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
  setSistemaEditData({...sistemaEditData!, [name]:value});
  console.log(sistemaEditData);
}

const handleOnChangeQuery = (value: string) => {
  setQuery(value);
  console.log(query);
}

const handleEditar = (value:string) =>{
  obtenerSistemaEditar(value);
  
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
            <Button size="3xs" rounded="none" w="1/6" h="full" onPress={() => obtenerSistema()}>
                Buscar
            </Button>
            }
            placeholder="Buscar por nombre..."
        />
        <ScrollView>
        <Center>
            {!!loading ? <></> : sistemaData.map((item:any, itemI:any) => (
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
                  <Text fontWeight="800">
                    Categoria: {item.descripcion}
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
        <Modal.Header>Agregar Sistema</Modal.Header>
        <Modal.Body>
            <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input placeholder='Nombre' onChangeText={(event) => handleOnChange('nombre',event)} value={userInputData?.nombre} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Categoría</FormControl.Label>
            <Select 
              backgroundColor={'white'}
              placeholder='servicios'
              selectedValue={position} 
              mx={{base: 0, md: "auto"}} 
              accessibilityLabel="Select a position for Popover" 
              onValueChange={nextValue => {setUserInputData({...userInputData!,['id_categoria']:nextValue});setPosition(nextValue); setUserServicio(servicioData.filter((x:any) => x.id_servicio === nextValue)); console.log(userInputData);}} 
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
        <Modal.Header>Editar Sistema</Modal.Header>
        <Modal.Body>
            <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input placeholder='Nombre' onChangeText={(event) => handleOnChangeEdit('nombre',event)} value={sistemaEditData?.nombre} backgroundColor={'white'}/>
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Categoria</FormControl.Label>
            <Select 
              selectedValue={position} 
              backgroundColor={'white'}
              mx={{base: 0, md: "auto"}} 
              accessibilityLabel="Select a position for Popover" 
              onValueChange={nextValue => {setSistemaEditData({...sistemaEditData!,['id_categoria']:nextValue});setPosition(nextValue); setUserServicio(servicioData.filter((x:any) => x.id_servicio === nextValue)); console.log(userInputData);
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

export default SistemaScreen;