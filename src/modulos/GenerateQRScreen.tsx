import { Center, Input, Stack, Button } from 'native-base';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';

export type credendencialType = {
    correo: string,
    password:string
};

const GenerateQRScreen = ({ navigation } : {navigation: any}) => {
    const xml = React.useRef<any>();
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        getServicio();
    },[])
    
    const getServicio = async() => {
      const _token = await AsyncStorage.getItem('token');
      const _responseLogin = await AsyncStorage.getItem('responseLogin');
      await axios.get(`http://192.168.0.2:8000/api/servicios/${_responseLogin != null ? JSON.parse(_responseLogin) : null}`,
        {
          headers:{
            'Authorization':`Bearer ${_token}`
          }
        }
        )
        .then(response => {
          onGenerate(response.data[0].id)
        })
        .catch(error => {
          console.log(error,'sasa');
        });

    }

    const onGenerate = async(sistema: string) => {
        setLoading(true);
        const _token = await AsyncStorage.getItem('token');
        await axios.get(`http://192.168.0.2:8000/api/qrCode/${sistema}`,
        {
          headers:{
            'Authorization':`Bearer ${_token}`
          }
        }
        )
        .then(response => {
          console.log(sistema);
          
          xml.current = (`${response.data}`);

          setLoading(false);
        })
        .catch(error => {
          console.log(error,'jhjk');
        });
      }

    if(!!loading){return null}; 
    
    return (
        <Center>
            <Stack
                mt={3}
                space={4}
                w={{base: "75%", md: "25%",}}
            >
                <SvgXml xml={xml.current === undefined ? '<svg></svg>' : xml.current} width="100%" height="80%" />
                <Button  onPress={() => navigation.navigate('Gestionar Sistema')}>Descargar QR</Button>
            </Stack>
        </Center>
    );
  };

export default GenerateQRScreen;