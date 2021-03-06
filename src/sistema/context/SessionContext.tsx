import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export type credendencialType = {
    correo: string,
    password:string
};

export const SessionContext = React.createContext<any | undefined>(undefined);

export const  SessionProvider = (props:any ) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [tokenUsuario, setTokenUsuario] = React.useState<String|null>(null);
    const [responseLogin, setResponseLogin] = React.useState<any>('');
    const [responseUserLogin, setResponseUserLogin] = React.useState<any>();

    const signIn = async(credenciales: credendencialType) => {
        setIsLoading(true);
        await axios.post('http://192.168.0.2:8000/api/login', {
            'correo': credenciales.correo,
            'password': credenciales.password,
            })
            .then(response => {
                const JsonValue:string = JSON.stringify(response.data.usuario.id_sistema)
                AsyncStorage.setItem('token', response.data.access_token);
                AsyncStorage.setItem('responseLogin', JsonValue);
                setTokenUsuario(response.data.access_token);
                setResponseLogin(response.data.usuario.id_rol_usuario);
                setResponseUserLogin(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log('ERROR',error); 
                setIsLoading(false);
                Alert.alert(
                    'Alerta',
                    `Error al inciar sesión, revise que los datos esten ingresado correctamente.`,
                    [
                      { text: "OK" }
                    ]
                  )
            });
    };      

    const signOut = () => {
        console.log('sali');
        setTokenUsuario(null);
        setIsLoading(false);
    };

    const signUp = () => {
        setTokenUsuario('sdf');
        setIsLoading(false);
    };

    const value= React.useMemo(() => {
        return({
            tokenUsuario,
            responseLogin,
            responseUserLogin,
            isLoading,
            signIn,
            signOut
        })
    },[tokenUsuario, responseLogin, isLoading]);

    return <SessionContext.Provider value={value} {...props}/>
}

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (!context) {
        throw new Error('useSession debe estar dentro del proveedor SessionContext')
    }
    return context;
}