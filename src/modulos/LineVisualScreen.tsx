import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView } from 'native-base';
import React from 'react';
import GenerateQRScreen from './GenerateQRScreen';

export type credendencialType = {
    correo: string,
    password:string
};

const LineVisualScreen = ({ navigation } : {navigation: any}) => {
    const instState = [
        {
          title: "01",
          isCompleted: false,
        },
        {
          title: "02",
          isCompleted: false,
        },
        {
          title: "03",
          isCompleted: false,
        },
        {
          title: "04",
          isCompleted: false,
        },
        {
            title: "05",
            isCompleted: false,
        },
        {
            title: "06",
            isCompleted: false,
        },
        {
            title: "07",
            isCompleted: false,
        }
      ]
    const [flag, setFlag] = React.useState<boolean>(false);
    const [list, setList] = React.useState(instState);

    return (
        <ScrollView>
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.900"
                    borderWidth="1"
                    _dark={{
                    borderColor: "coolGray.900",
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
                            Puma Marina Arauco
                        </Heading>
                        <Text
                            fontSize="xs"
                            _light={{
                            color: "black",
                            }}
                            _dark={{
                            color: "black",
                            }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1"
                            alignSelf={'center'}
                        >
                            Activar o desactivar fila
                        </Text>
                        </Stack>
                        <Button bg={'primary.100'} onPress={() => setFlag(!flag)}>{!!flag ? 'Activar Fila' : 'Desactivar Fila'}</Button>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                        </HStack>
                    </Stack>
                </Box>
                <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.900"
                    borderWidth="1"
                    _dark={{
                    borderColor: "coolGray.900",
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
                        <VStack space={2}>
                        <Heading size="md" ml="-1">
                            Turno Proximos
                        </Heading>
                            {list.map((item, itemI) => (
                                <VStack
                                w="100%"
                                justifyContent="space-between"
                                alignItems="center"
                                key={item.title + itemI.toString()}
                                >
                                    <Heading
                                    strikeThrough={item.isCompleted}
                                    _light={{
                                        color: item.isCompleted ? "gray.400" : "coolGray.800",
                                    }}
                                    _dark={{
                                        color: item.isCompleted ? "gray.400" : "coolGray.50",
                                    }}
                                    >
                                    {item.title}
                                    </Heading>
                                </VStack>
                                
                            ))}
                        </VStack>
                        <HStack alignItems="center" space={4} justifyContent="space-between"/>
                        <Button bg={'primary.100'}>Siguiente Turno</Button>
                        <HStack alignItems="center" space={4} justifyContent="space-between"/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
        </ScrollView>
    );
  };

export default LineVisualScreen;