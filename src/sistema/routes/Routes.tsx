import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FilaEsperaClienteScreen from '../../../src/modulos/FilaEsperaClienteScreen';
import GenerateQRScreen from '../../../src/modulos/GenerateQRScreen';
import NavigationAdministratorScreen from '../../../src/modulos/NavigationAdministratorScreen';
import LineVisualScreen from '../../../src/modulos/LineVisualScreen';
import LineInformationScreen from '../../../src/modulos/LineInformationScreen';
import NavigationAdministrativoScreen from '../../../src/modulos/NavigationAdministrativoScreen';
import AdministrativoScreen from '../../../src/modulos/AdministrativoScreen';
import ClienteScreen from '../../../src/modulos/ClienteScreen';
import SistemaScreen from '../../../src/modulos/SistemaScreen';
import HomeScreen, { credendencialType } from '../../../src/modulos/HomeScreen';
import { useSession } from '../context/SessionContext';
import NavigationScreen from '../../../src/modulos/NavigationScreen';
import QRScreen from '../../../src/modulos/QRScreen';
import { View } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FilaEsperaClienteConTurnoPrevioScreen from '../../modulos/FilaEsperaClienteConTurnoPrevioScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const {tokenUsuario, responseLogin, isLoading} = useSession();

    React.useEffect(() => {
        console.log('token',tokenUsuario);
        
    },[]);
    
    if(isLoading) {
        return(
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
          </View>
        )
    }
    
    return(
        <NavigationContainer>
        <Stack.Navigator>
        {tokenUsuario !== null && isLoading === false ? (
            <>
              {responseLogin === '142e99de-53f2-11ec-a24c-f02f741864f7' ? 
              <>
              <Stack.Screen name="No Fila Administrador" component={NavigationAdministratorScreen} />
              <Stack.Screen name="Generar Qr" component={GenerateQRScreen} />
              <Stack.Screen name="Fila" component={LineVisualScreen} />
              <Stack.Screen name="Informacion Fila" component={LineInformationScreen} />
              <Stack.Screen name="Gestionar Administrativo" component={AdministrativoScreen}/>
              <Stack.Screen name="Gestionar Cliente" component={ClienteScreen}/>
              <Stack.Screen name="Gestionar Sistema" component={SistemaScreen}/>
              </>
               :
               responseLogin === 'cfbb7ff6-6c59-11ec-9eb4-f02f741864f7' ? 
               <>
              <Stack.Screen name="No Fila Administrativo" component={NavigationAdministrativoScreen} />
              <Stack.Screen name="Generar Qr" component={GenerateQRScreen} />
              <Stack.Screen name="Fila" component={LineVisualScreen} />
              <Stack.Screen name="Informacion Fila" component={LineInformationScreen} />
              </>
              :
              <>
              <Stack.Screen name="No Fila Cliente" component={NavigationScreen} />
              <Stack.Screen name="Leer Qr" component={QRScreen} />
              <Stack.Screen name="Fila Espera Cliente" component={FilaEsperaClienteScreen} />
              <Stack.Screen name="Fila Espera Cliente Turno Previo" component={FilaEsperaClienteConTurnoPrevioScreen} />
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
    )
}

export default Routes