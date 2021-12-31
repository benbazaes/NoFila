import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen, { credendencialType } from './src/modulos/HomeScreen';
import NavigationScreen from './src/modulos/NavigationScreen';
import QRScreen from './src/modulos/QRScreen';
import { NativeBaseProvider, Box, View } from 'native-base';
import { SessionContext } from './src/sistema/context/SessionContext';
import { ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FilaEsperaClienteScreen from './src/modulos/FilaEsperaClienteScreen';
import GenerateQRScreen from './src/modulos/GenerateQRScreen';
import NavigationAdministratorScreen from './src/modulos/NavigationAdministratorScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [tokenUsuario, setTokenUsuario] = React.useState<String|null>(null);
  const [responseLogin, setResponseLogin] = React.useState<any>('');

  const authContext = React.useMemo(() => ({
    signIn: async (credenciales: credendencialType) => {

      await axios.post('http://192.168.0.11:8000/api/login', {
        'correo': credenciales.correo,
        'password': credenciales.password,
      })
      .then(response => {
        const JsonValue:string = JSON.stringify(response.data.usuario.id_sistema)
        AsyncStorage.setItem('token', response.data.access_token);
        AsyncStorage.setItem('responseLogin', JsonValue);
        
        setTokenUsuario(response.data.access_token);
        setResponseLogin(response.data.usuario.id_rol_usuario);
        console.log(responseLogin.current);
        
        setIsLoading(false)
      })
      .catch(error => {
        console.log('ERROR',error);
      });
    },
    signOut: () => {
      setTokenUsuario(null);
      setIsLoading(false);
    },
    signUp: () => {
      setTokenUsuario('sdf');
      setIsLoading(false);
    },
  }),[]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  });

  if(isLoading) {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }

  return (
    <SessionContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
              {tokenUsuario !== null ? (
                <>
                  {responseLogin === '142e99de-53f2-11ec-a24c-f02f741864f7' ? 
                  <>
                  <Stack.Screen name="NavigationAdministratorScreen" component={NavigationAdministratorScreen} />
                  <Stack.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
                  </>
                   : 
                  <>
                  <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
                  <Stack.Screen name="QRScreen" component={QRScreen} />
                  <Stack.Screen name="FilaEsperaClienteScreen" component={FilaEsperaClienteScreen} />
                  </>
              }
                  </>
                )
              :
                  <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'Welcome' }}
                  />
              }
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SessionContext.Provider>
  );
};

export default App;