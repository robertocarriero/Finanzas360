import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, ScrollView, Dimensions} from 'react-native';

StatusBar.setHidden(false);
const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  // Estado para almacenar el estado de presionado de cada botón
  const [buttonPressed, setButtonPressed] = useState({
    dolar: false,
    conversor: false,
    simulador: false,
    webs: false,
    estadisticas: false,
    glosario: false,
  });

  return (
    <View style={styles.container}>
     <ScrollView>
      <View style={{alignSelf:'center'}}>
        <Text style={styles.title} >Herramientas del Inversor</Text>
      </View>
      <View style={styles.column}>
      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('Dolar')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View style={{width: 30, height: 30, marginLeft: 50, marginTop: 10}}>
          <Image source={require('../assets/cotizacion.png')} style={styles.imageCoti} />
        </View>  
        <View >
          <Text style={styles.titulo}>Cotización de Divisas {"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Cotización en tiempo real</Text></Text>
        </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('Conversor')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View style={{width: 30, height: 30, marginLeft: 50, marginTop: 10}}>
          <Image source={require('../assets/conversor.png')} style={styles.imageConv} />
        </View>  
        <View >
          <Text style={styles.titulo}>Conversor de Divisas{"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Conversión entre Monedas </Text></Text>
        </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('CompraVenta')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View style={{width: 30, height: 30, marginLeft: 50, marginTop: 10}}>
          <Image source={require('../assets/conversor.png')} style={styles.imageConv} />
        </View>  
        <View >
          <Text style={styles.titulo}>Compra Venta de Monedas{"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Conversión entre Monedas </Text></Text>
        </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('Simulador')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View style={{width: 30, height: 30, marginLeft: 50, marginTop: 10}}>
          <Image source={require('../assets/simulador.png')} style={styles.imageSim} />
        </View>  
        <View >
          <Text style={styles.titulo}>Simulador Plazo Fijo {"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Calculá tu Inversión</Text></Text>
        </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('Estadistica')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View > 
          <Image source={require('../assets/concersorMone.png')} style={styles.imageEst} />
        </View>  
        <View >
          <Text style={styles.tituloEst}>Presupuesto Personal{"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Podés Controlar tus Gastos </Text></Text>
        </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('Inversiones')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View style={{width: 30, height: 30, marginLeft: 30, marginTop: 10}}>
          <Image source={require('../assets/inversiones.png')} style={styles.imageFin} />
        </View>  
        <View >
          <Text style={styles.tituloWeb}>Portales Financieros  {"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Información Sobre Inversiones</Text></Text>
        </View>
        </View>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={[styles.button, buttonPressed.conversor ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate('Glosario')}
        onPressIn={() => setButtonPressed({ ...buttonPressed, conversor: false })}
        onPressOut={() => setButtonPressed({ ...buttonPressed, conversor: false })}
      >
       <View style={styles.buttonContent}>
        <View style={{width: 30, height: 30, marginLeft: 50, marginTop: 10}}>
          <Image source={require('../assets/signo-de-interrogacion.png')} style={styles.imageGlo} />
        </View>  
        <View >
          <Text style={styles.tituloGlo}>Glosario Financiero {"\n"}
          <Text style={{fontSize: 12, fontWeight:'300'}}>Términos Económicos Financieros</Text></Text>
        </View>
        </View>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '10',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: '1%',
    alignSelf: 'stretch',
    },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: '1%',
    width: 370,
    height: 70,
    alignItems: 'center',
    borderColor: '#ccc',
    marginHorizontal: '1%',
    elevation: 10,
  },
  buttonPressed: {
    backgroundColor: '#cfcfcf',
    color: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 19,
    justifyContent: 'center',
    
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: -120,
    marginTop: -15,
  },
  imageConv: {
    width: 50,
    height: 50,
    marginLeft: -105,
    marginTop: -10,
  },
  imageSim: {
    width: 50,
    height: 45,
    marginLeft: -105,
    marginTop: -6,
  },
  imageCoti: {
    width: 50,
    height: 50,
    marginLeft: -105,
    marginTop: -10,
  },
  imageGlo: {
    width: 45,
    height: 45,
    marginLeft: -90,
    marginTop: -8,
  },
  imageEst: {
    width: 40,
    height: 60,
    marginLeft: -45,
    marginTop: -2,
  },
  imageFin: {
    width: 60,
    height: 70,
    marginLeft: -90,
    marginTop: -20,
  },
  titulo:{
    marginTop: -40,
    marginLeft: 20,
    fontSize: 17,
  },
  tituloEst:{
    marginTop: -55,
    marginLeft: 20,
    fontSize: 17,
  },
  tituloWeb:{
    marginTop: -39,
    marginLeft: 25,
    fontSize: 17,
  },
  tituloGlo:{
    marginTop: -39,
    marginLeft: 35,
    fontSize: 17,
  },
});

export default Home;
