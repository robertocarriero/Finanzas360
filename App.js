import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


  // Importación de los componentes de pantalla
import Inversiones from './Screen/Inversiones';
import Home from './Screen/Home';
import BudgetApp from './Screen/estadistica';
import Dolar from './Screen/dolar';
import Simulador from './Screen/Simulador';
import Conversor from './Screen/Conversor';
import Glosario from './Screen/Glosario';
import WebViewScreen from './Screen/WebView';
import CompraVenta from './Screen/CompraVenta';

// Crea un Stack Navigator
const Stack = createStackNavigator();

const App = () => {

  const CustomHeaderBack = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.headerBack}>
      <Text style={styles.headerBackText}><Image source={require('./assets/casa-3d.png')} style={styles.imageGlo} />  Inicio</Text>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Finanzas 360',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTitleAlign: 'center', // Esto centrará el título en la parte superior de la pantalla
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>
          )}}
          
        />
        
        <Stack.Screen
          name="Inversiones"
          component={Inversiones}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen}
        options={({ navigation }) => ({
          title: 'Finanzas 360',
          headerRight: () => (
            <View style={{ marginLeft: 10 }}>
              <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
            </View>),
          headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#f4511e',
          },
        })}
         />

        <Stack.Screen
          name="Estadistica"
          component={BudgetApp}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />

        <Stack.Screen
          name="Glosario"
          component={Glosario}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />

        <Stack.Screen
          name="Simulador"
          component={Simulador}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />

        <Stack.Screen
          name="Dolar"
          component={Dolar}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />

        <Stack.Screen
          name="Conversor"
          component={Conversor}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />
        <Stack.Screen
          name="CompraVenta"
          component={CompraVenta}
          options={({ navigation }) => ({
            title: 'Finanzas 360',
            headerRight: () => (
              <View style={{ marginLeft: 10 }}>
                <Image source={require('./assets/logos1.png')} style={{ width: 50, height: 50, marginRight: 70,}} />
              </View>),
            headerLeft: () => <CustomHeaderBack onPress={() => navigation.navigate('Home')} />,
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerBackText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
    marginBottom: 10,
  },
  imageGlo: {
    width: 35,
    height: 35,
    justifyContent: 'center',
  }
})

export default App;
