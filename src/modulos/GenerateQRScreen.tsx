import { Center, Input, Stack, Button } from 'native-base';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import { useSession } from '../sistema/context/SessionContext';
import RNFetchBlob from 'rn-fetch-blob';

export type credendencialType = {
    correo: string,
    password:string
};

const GenerateQRScreen = ({ navigation } : {navigation: any}) => {
    const {responseUserLogin, tokenUsuario} = useSession();
    const xml = React.useRef<any>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const { config, fs } = RNFetchBlob

    let PictureDir = fs.dirs.PictureDir;
    
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification : true,
        path:  PictureDir + '/img-from-react-native.png', // this is the path where your downloaded file will live in
        description : 'Downloading image.'
      }
    }

    React.useEffect(() => {
        onGenerate();
    },[])

    const onGenerate = async() => {
        setLoading(true);
        await axios.post(`http://192.168.0.2:8000/api/qrCode`,
        {
          'id_servicio': responseUserLogin.usuario.id_servicio
        },
        {
          headers:{
            'Authorization':`Bearer ${tokenUsuario}`
          }
        }
        )
        .then(response => {
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
                <Button  onPress={() =>config(options).fetch('GET', `http://192.168.0.2:8000/api/qrCodePNG/e6f9a7a7-1c34-466e-a45a-095a9bab8fcc`).then((res) => {
  console.log(res);
  
})}>Descargar QR</Button>
            </Stack>
        </Center>
    );
  };

export default GenerateQRScreen;