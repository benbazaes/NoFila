import { Center, Input, Stack, Button, Heading, Box, Text, HStack, AspectRatio, Image, VStack, Checkbox, IconButton, Icon, ScrollView } from 'native-base';
import React from 'react';

export type credendencialType = {
    correo: string,
    password:string
};

const LineInformationScreen = ({ navigation } : {navigation: any}) => {

    const [flag, setFlag] = React.useState<boolean>(false);

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
                        <VStack space={2}>
                        <Heading size="md" ml="-1">
                            Informe de Fila
                        </Heading>
                        <Text>Nombre de Servicio: Puma Marina Arauco</Text>
                        <Text>Personas Atendidas: 05</Text>
                        <Text>Personas en fila: 16</Text>
                        <Text>Tiempo Estimado de Espera: 15:45</Text>
                        </VStack>
                        <HStack alignItems="center" space={4} justifyContent="space-between"/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
        </ScrollView>
    );
  };

export default LineInformationScreen;