import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/modulos/HomeScreen';
import ProfileScreen from './src/modulos/ProfileScreen';
import { NativeBaseProvider, Box, View } from 'native-base';
import { SessionContext } from './src/sistema/context/SessionContext';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [tokenUsuario, setTokenUsuario] = React.useState<String|null>(null);

  const authContext = React.useMemo(() => ({
    signIn: async () => {
      await axios.post('http://10.0.2.2:8000/api/login', {
        'correo': 'benjamin.bazaes@gmail.com',
        'password': 'Admin123',
      })
      .then(response => {
        console.log(response);
        setTokenUsuario(response.data.access_token); 
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error,'jhjk');
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
                  <Stack.Screen name="Profile" component={ProfileScreen} />
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