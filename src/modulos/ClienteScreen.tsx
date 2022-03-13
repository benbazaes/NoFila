import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView, Divider, Modal, FormControl, View } from 'native-base';
import React from 'react';

export type credendencialType = {
    correo: string,
    password:string
};

const ClienteScreen = ({ navigation } : {navigation: any}) => {
    const Administrativo = [
        {
          nombre: 'Patricio',
          apellido: 'Baez',
          telefono:'950105450',
          correo:'pb@gmail.com',
        },
        {
            nombre: 'Oscar',
            apellido: 'Riveros',
            telefono:'945784578',
            correo:'or@gmail.com',
          },
          {
            nombre: 'Javiera',
            apellido: 'Moya',
            telefono:'978986545',
            correo:'jm@gmail.com',
          },
          {
            nombre: 'Matias',
            apellido: 'Rojas',
            telefono:'932659854',
            correo:'mr@gmail.com',
          },
          {
            nombre: 'Fernando',
            apellido: 'Rivera',
            telefono:'965986598',
            correo:'fc@gmail.com',
          },
       
      ]
    const [flag, setFlag] = React.useState<boolean>(false);
    const [list, setList] = React.useState(Administrativo);
    const [showModal, setShowModal] = React.useState<boolean>(false)

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
            InputRightElement={
            <Button size="3xs" rounded="none" w="1/6" h="full">
                Buscar
            </Button>
            }
            placeholder="Buscar..."
        />
        <ScrollView>
        <Center>
            {list.map((item, itemI) => (
                <Box
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
                      <Button>Editar</Button>
                    </HStack>
                    <HStack alignItems="flex-start">
                      <Button>Eliminar</Button>
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
        <Modal.Header>Agregar Cliente</Modal.Header>
        <Modal.Body>
            <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input />
            </FormControl>
            <FormControl>
            <FormControl.Label>Apellido</FormControl.Label>
            <Input />
            </FormControl>
            <FormControl>
            <FormControl.Label>Telefono</FormControl.Label>
            <Input />
            </FormControl>
            <FormControl mt="3">
            <FormControl.Label>Correo</FormControl.Label>
            <Input />
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
                setShowModal(false)
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

export default ClienteScreen;