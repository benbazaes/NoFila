import { Button, Center, Input, Stack } from "native-base";
import React from "react";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import FilaEsperaClienteScreen from "./FilaEsperaClienteScreen";

const QRScreen = ({ navigation, route }: {navigation: any, route:any}) => {
    const [viewFocused, setViewFocused] = React.useState<boolean>(true);
    const [responseFila, setResponseFila] = React.useState<any>();
    const _token: any = AsyncStorage.getItem('token');

    React.useEffect(() => {
      const onFocus = navigation.addListener('focus', () => {
          setViewFocused(true);
        });
      
      const onBlur = navigation.addListener('blur', () => {
        setViewFocused(false);
      });
      
      onFocus();
      onBlur();
      }, [navigation]);

    const onSuccess = async(e : any) => {
      await axios.post('http://192.168.0.11:8000/api/servicioCliente', {
        'id_servicio': e.data,
        'id_usuario': '0a4e6d1a-ca03-4382-8a28-a4a8cbd72982'
      },
      {
        headers:{
          'Authorization':`Bearer ${_token._W}`
        }
      }
      )
      .then(response => {
        setResponseFila(response.data);
        navigation.navigate('FilaEsperaClienteScreen', {
          xd: response.data
        });
      })
      .catch(error => {
        console.log(error,'jhjk');
      });
       /*  Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        ); */
    }

    return(
        <Stack>
        {viewFocused && 
        <QRCodeScanner
            onRead={onSuccess}
            reactivate={true}
            reactivateTimeout={2000}
            //flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker
            topContent={
            <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
            </Text>
            }
            bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
            }
        />
        }
        </Stack>
    );
};

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

export default QRScreen;
