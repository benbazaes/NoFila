import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SessionProvider} from './src/sistema/context/SessionContext';
import { BroadcastProvider } from './src/sistema/context/BroadcastContext';
import Routes from './src/sistema/routes/Routes';

const App = () => {

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#D0B828',
        100: '#F8C800',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
    components:{
      Input: {
        baseStyle:{
          color:'black'
        }
      },
      Heading: {
        baseStyle:{
          color:'black',
        },
        defaultProps: {
          alignSelf:'center'
        }
      },
      Button: {
        baseStyle: {
        },
        defaultProps: {
          bg:'primary.100',
        }
      }
    }
  });

  return (
    <SessionProvider>
      <BroadcastProvider>
      <NativeBaseProvider theme={theme}>
        <Routes/>
      </NativeBaseProvider>
      </BroadcastProvider>
    </SessionProvider>
  );
};

export default App;