import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView, Divider, Modal, FormControl, View } from 'native-base';
import React from 'react';

export type credendencialType = {
    correo: string,
    password:string
};

const AdministrativoScreen = ({ navigation } : {navigation: any}) => {
    const Administrativo = [
        {
          nombre: 'Benjamin',
          apellido: 'Bazaes',
          telefono:'950105450',
          correo:'benjamin.bazaes@gmail.com',
        },
        {
            nombre: 'Juan',
            apellido: 'Perez',
            telefono:'945784578',
            correo:'jp@gmail.com',
          },
          {
            nombre: 'Carmen',
            apellido: 'Paez',
            telefono:'978986545',
            correo:'kp@gmail.com',
          },
          {
            nombre: 'Pedro',
            apellido: 'Suarez',
            telefono:'932659854',
            correo:'ps@gmail.com',
          },
          {
            nombre: 'Maria',
            apellido: 'Cifuentes',
            telefono:'950105450',
            correo:'mc@gmail.com',
          },
          {
            nombre: 'Jose',
            apellido: 'Solis',
            telefono:'950105450',
            correo:'js@gmail.com',
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
        <Modal.Header>Agregar Administrativo</Modal.Header>
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

export default AdministrativoScreen;