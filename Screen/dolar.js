import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, TouchableOpacity, ScrollView, Dimensions}from 'react-native';

const { width, height } = Dimensions.get('window');

// Definimos la estructura del objeto con los datos de la cotización del dólar
const initialDolarData = {
  compra: 0,
  venta: 0,
  casa: "",
  nombre: "",
  moneda: "",
  fechaActualizacion: ""
};

const Dolar = () => {
  const [loading, setLoading] = useState(false);
  const [dolarData, setDolarData] = useState(initialDolarData);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDolarData = (endpoint) => {
    setLoading(true);
    setError(null);

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error(`No se pudo obtener la cotización del dólar desde ${endpoint}`);
        }
        return response.json();
      })
      .then(data => {
         // Verificar si la moneda es el peso chileno
         if (data.moneda === 'CLP') {
          // Dividir el valor por 100
          data.compra /= 100;
          data.venta /= 100;
        }
        setDolarData(data);
        setLoading(false);
        setModalVisible(true);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setDolarData(initialDolarData);
  };

  const renderModalContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="blue" />;
    }

    if (error) {
      return <Text style={{ color: 'red' }}>{error}</Text>;
    }
// Convertir la fecha de actualización al formato deseado
const fecha = new Date(dolarData.fechaActualizacion);
const formattedDate = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;

    return (
      <View >
         <Text style={{fontSize:16,
        fontWeight:'bold',
        textAlign: 'center',}}>Moneda: {dolarData.moneda}  {dolarData.casa}</Text>
        
        <Text
        style={{fontSize:16,
        fontWeight:'bold',
        textAlign: 'center',
        marginTop: 15,}}>Compra: $  {dolarData.compra}</Text>

        <Text style={{fontSize:16,
        fontWeight:'bold',
        textAlign: 'center',
        marginTop: 15}} >Venta:  $ {dolarData.venta}</Text>

        <Text style={{fontSize:16,
        fontWeight:'bold',
        textAlign: 'center',
        marginTop: 15,}}>Actualización: {formattedDate}</Text>
        
      </View>
    );
  };

  const endpoints = [
    { url: "https://dolarapi.com/v1/ambito/dolares/oficial", label: "Dólar Oficial" },
    { url: "https://dolarapi.com/v1/ambito/dolares/blue", label: "Dolar Blue" },
    { url: "https://dolarapi.com/v1/ambito/dolares/bolsa", label: "Dólar Bolsa" },
    { url: "https://dolarapi.com/v1/ambito/dolares/contadoconliqui", label: "Dólar CCL" },
    { url: "https://dolarapi.com/v1/ambito/dolares/tarjeta", label: "Dólar tarjeta" },
    { url: "https://dolarapi.com/v1/ambito/dolares/mayorista", label: "Dólar Mayorista" },
    { url: "https://dolarapi.com/v1/ambito/dolares/cripto", label: "Dólar Cripto" },
    { url: "https://dolarapi.com/v1/cotizaciones/eur", label: "Euros" },
    { url: "https://dolarapi.com/v1/cotizaciones/brl", label: "Real Brasileño" },
    { url: "https://dolarapi.com/v1/cotizaciones/clp", label: "Peso Chileno" },
    { url: "https://dolarapi.com/v1/cotizaciones/uyu", label: "Peso Uruguayo" },
    // Agregar aquí los otros endpoints que a utilizar
  ];

  return (
    <ScrollView >
    <View style={styles.container}>
      
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
        >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {renderModalContent()}
        <TouchableOpacity
        onPress={closeModal}
        style={[styles.buttonModal, { marginTop: 20 }]}
        >
        <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
        </Modal>
    <View style={styles.column}>
       <Text style={styles.text}>Cotización de Divisas</Text>
          {endpoints.map((endpoint, index) => (
          <View style={styles.buttonContainer} key={index}>
          <TouchableOpacity style={styles.button} onPress={() => fetchDolarData(endpoint.url)}>
            <Text style={styles.buttonText}>{endpoint.label}<Text style={{fontSize:12, fontWeight: '400'}}>{'    '}Cotización Compra Venta</Text></Text>
          </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
    </ScrollView> 
  );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
   },
   buttonContainer: {
    marginTop: '0.1%', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginTop: '10%',
    //borderWidth: 3,
    borderColor: '#ccc',
    marginBottom: 60,
    elevation: 10,
  },
  modalText: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 40,
    backgroundColor: '#ff6347', // Color rojo
  },
  closeButtonText: {
    color: '#fff', // Texto blanco
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 9,
    borderRadius: 10,
    width: 380,
    height: 50,
    borderColor: '#ccc',
    marginLeft: 'auto',
    marginTop: '1%',
    elevation: 10,
    marginBottom: '1%'
  },
    buttonText:{
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
  },
  buttonModal: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    width: 140,
    height: 52,
    justifyContent: 'center',
    borderColor: '#ccc',
    elevation: 10,
    borderWidth: 2,
    borderColor: 'gray',
  },
  text:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '4%',
    alignContent: 'center',
    textAlign: 'center',
    
   }, 
  price:{
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Dolar;
