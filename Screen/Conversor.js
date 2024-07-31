import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { normalize } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

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
  { url: "https://dolarapi.com/v1/cotizaciones/uyu", label: "Peso Uruguayo" }
];

const Conversor = () => {
  const [monto, setMonto] = useState('');
  const [tipoMonedaBase, setTipoMonedaBase] = useState('Pesos Argentinos');
  const [tipoMonedaObjetivo, setTipoMonedaObjetivo] = useState('Pesos Argentinos');
  const [resultado, setResultado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const handleMontoChange = (text) => {
    setMonto(text);
  };

  const handleEnterPress = () => {
    if (!monto) {
      Alert.alert('Debe ingresar una cifra');
    }
  };


  const handleTipoMonedaBaseChange = (value) => {
    setTipoMonedaBase(value);
  };

  const handleTipoMonedaObjetivoChange = (value) => {
    setTipoMonedaObjetivo(value);
  };

  const formatNumber = {
    separador: ".", // Separador para los miles
    sepDecimal: ',', // Separador para los decimales
    formatear: function (num) {
      num = parseFloat(num).toFixed(2); // Limitar el número de decimales a dos
      num += '';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
      }
      return splitLeft + splitRight;
    },
    nuevo:function(num, simbol){
      this.simbol = simbol ||'';
      return this.formatear(num);
    }
  };
  

  const convertirMoneda = () => {

    if (monto) {
      setLoading(true);
      setError('');
      if (tipoMonedaObjetivo === 'Pesos Argentinos') {
        // Si la moneda objetivo es 'Pesos Argentinos', calcular directamente
        // el resultado en pesos argentinos sin necesidad de buscar en un endpoint
        const tasaBase = 1;
        const endpointBase = endpoints.find(item => item.label === tipoMonedaBase);
        if (endpointBase) {
          fetch(endpointBase.url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`No se pudo obtener la cotización de ${tipoMonedaBase}`);
              }
              return response.json();
            })
            .then(dataBase => {
              let tasaObjetivo = dataBase.compra; // Usamos el valor de compra de la moneda base
  
              // Si la moneda base es el peso chileno, dividimos la tasa por 100
              if (tipoMonedaBase === 'Peso Chileno') {
                tasaObjetivo /= 100;
              }
  
              const resultado = parseFloat(monto) * parseFloat(tasaObjetivo) / parseFloat(tasaBase);
              const resultadoFormateado = formatNumber.nuevo(resultado);
              // Establecer el resultado con formato
              setResultado(resultadoFormateado);
              setLoading(false);
              setModalVisible(true);
            })
            .catch(error => {
              setError(error.message);
              setLoading(false);
              console.error('Error al obtener la cotización:', error);
            });
        } else {
          setError(`No se encontró el endpoint para la moneda ${tipoMonedaBase}`);
        }
      } else {

      if (monto) {
      setLoading(true);
      setError('');
      if (tipoMonedaBase === 'Pesos Argentinos' && tipoMonedaObjetivo === 'Peso Chileno') {
        // Si la moneda objetivo es 'Pesos Argentinos', calcular directamente
        // el resultado en pesos argentinos sin necesidad de buscar en un endpoint
        const tasaBase = 1;
        const endpointBase = endpoints.find(item => item.label === tipoMonedaObjetivo);
        if (endpointBase) {
          fetch(endpointBase.url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`No se pudo obtener la cotización de ${tipoMonedaObjetivo}`);
              }
              return response.json();
            })
            .then(dataBase => {
              const tasaObjetivo = dataBase.compra; // Usamos el valor de compra de la moneda base
              const resultado = (parseFloat(monto) / parseFloat(tasaObjetivo))*100 / parseFloat(tasaBase);
              const resultadoFormateado =formatNumber.nuevo(resultado);
             // Establecer el resultado con formato
              setResultado(resultadoFormateado);
              setLoading(false);
              setModalVisible(true);
            })
            .catch(error => {
              setError(error.message);
              setLoading(false);
              console.error('Error al obtener la cotización:', error);
            });
        } else {
          setError(`No se encontró el endpoint para la moneda ${tipoMonedaBase}`);
        }
      } else {
    if (monto) {
      setLoading(true);
      setError('');
      if (tipoMonedaBase === 'Pesos Argentinos') {
        let tasaBase = 1; // La tasa de cambio es 1 porque estamos convirtiendo desde y hacia pesos argentinos
        const endpointObjetivo = endpoints.find(item => item.label === tipoMonedaObjetivo);
        if (endpointObjetivo) {
          fetch(endpointObjetivo.url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`No se pudo obtener la cotización de ${tipoMonedaObjetivo}`);
              }
              return response.json();
            })
            .then(data => {
              const tasaObjetivo = data.venta; // Usamos el valor de compra de la moneda objetivo
              const resultado = (parseFloat(monto) / parseFloat(tasaObjetivo)* parseFloat(tasaBase));
              const resultadoFormateado =formatNumber.nuevo(resultado);
              setResultado(resultadoFormateado);
              setLoading(false);
              setModalVisible(true);
            })
            .catch(error => {
              setError(error.message);
              setLoading(false);
              console.error('Error al obtener la cotización:', error);
            });
        } else {
          setError(`No se encontró el endpoint para la moneda ${tipoMonedaObjetivo}`);
        }
      } else {
        const endpointBase = endpoints.find(item => item.label === tipoMonedaBase);
        const endpointObjetivo = endpoints.find(item => item.label === tipoMonedaObjetivo);
        if (endpointBase && endpointObjetivo) {
          fetch(endpointBase.url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`No se pudo obtener la cotización de ${tipoMonedaBase}`);
              }
              return response.json();
            })
            .then(dataBase => {
              const tasaBase = dataBase.compra; // Usamos el valor de compra de la moneda base
              fetch(endpointObjetivo.url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`No se pudo obtener la cotización de ${tipoMonedaObjetivo}`);
                  }
                  return response.json();
                })
                .then(dataObjetivo => {
                  const tasaObjetivo = dataObjetivo.venta; // Usamos el valor de compra de la moneda objetivo
                  const resultado = (parseFloat(monto) * parseFloat(tasaBase)) / parseFloat(tasaObjetivo);
                  const resultadoFormateado =  formatNumber.nuevo(resultado);
                  setResultado(resultadoFormateado);
                  setLoading(false);
                  setModalVisible(true);
                })
                .catch(error => {
                  setError(error.message);
                  setLoading(false);
                  console.error('Error al obtener la cotización:', error);
                });
            })
            .catch(error => {
              setError(error.message);
              setLoading(false);
              console.error('Error al obtener la cotización:', error);
            });
        } else {
          setError(`No se encontró el endpoint para la moneda ${tipoMonedaBase} o ${tipoMonedaObjetivo}`);
        }
      }
    } else {
      Alert.alert('Por favor ingrese una cifra');
    }}}}
    } else {
      Alert.alert('Por favor ingrese una cifra');
  }
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Conversor de Moneda</Text>    
          <Text style={styles.titlecard}>Monto:</Text>
            <TextInput
            style={styles.input}
            value={monto}
            onChangeText={handleMontoChange}
            keyboardType="numeric"
            placeholder="Ingrese el monto"
          />
        <Text style={styles.label}>Elegir Moneda Origen:</Text>
      
        <Picker
          selectedValue={tipoMonedaBase}
          style={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) => handleTipoMonedaBaseChange(itemValue)}
        >
        <Picker.Item label="Pesos Argentinos" value="Pesos Argentinos"  style={styles.pickerItem}/>
          {endpoints.map((endpoint, index) => (
        <Picker.Item key={index} label={endpoint.label} value={endpoint.label}/>
        ))}
      </Picker>
      
          <Text style={styles.label}>Elegir Moneda Destino:</Text>
        <Picker
          selectedValue={tipoMonedaObjetivo}
          style={styles.pickerItem}
          itemStyle={styles.pickerItem} // Aquí aplicas el estilo a los elementos de la lista
          onValueChange={(itemValue, itemIndex) => handleTipoMonedaObjetivoChange(itemValue)}
        >
        <Picker.Item label="Pesos Argentinos" value="Pesos Argentinos" />
          {endpoints.map((endpoint, index) => (
        <Picker.Item key={index} label={endpoint.label} value={endpoint.label} />
        ))}
        </Picker>
        <View>
          <TouchableOpacity style={styles.button} onPress={convertirMoneda}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
          </View>
        </View>

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : resultado ? (
              <View>
                <Text style={styles.labelResultado}>Resultado</Text>
                <Text style={styles.resultado}>{resultado} {tipoMonedaObjetivo}</Text>
              </View>
            ) : null}
                <TouchableOpacity style={styles.buttonModal} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closed}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
card: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  marginTop: '0.5%',
  width: '80%',
  height: 'auto',
  marginLeft: 5,
  borderWidth: 2,
  borderColor: '#ccc',
  elevation: 12,
  position: 'relative',
  flexDirection: 'column',
},
container: {
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  alignContent:'center',
  flexDirection: 'column',
},
label: {
  fontSize: normalize(10),
  marginBottom: 2,
  color: '#9ba9a2',
  fontWeight: '900',
},
input: {
  position: 'relative',
  height: '15%',
  width: 'auto',
  borderColor: 'gray',
  elevation: 5,
  marginBottom: 5,
  paddingHorizontal: 10,
  backgroundColor: '#e6eae8',
  elevation: 5,
  marginTop: '-4%'
},
picker: {
  height: 'auto',
  width: '100%',
  marginBottom: '1%',
},
pickerItem: {
  backgroundColor: '#e6eae8',
  fontSize: normalize(16),
  color: 'black',
  fontWeight: '400',
  width: 'auto',
  height: 'auto',
},
button: {
  backgroundColor: '#e6eae8',
  borderRadius: 9,
  elevation: 7,
  padding: 3,
  borderRadius:12,
  marginTop: '6%',
  width: 100,
  height: 48,
  marginLeft: 'auto',
  marginBottom: '-0.2%',
  borderWidth: 2,
  borderColor: 'gray',
},
buttonText: {
  color: 'black',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 5,
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
},
modalContent: {
  backgroundColor: '#e6eae8',
  borderRadius: 9,
  elevation: 5,
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: -20,
  height: 180,
  width: 290,
},
buttonModal:{
  backgroundColor: '#e6eae8',
  borderRadius: 9,
  elevation: 5,
  marginTop: '40%',
  width: 150,
  height: 70,
  padding: 20,
  marginLeft: 10,
  borderRadius: 18,
  borderWidth: 2,
  borderColor: 'gray',
},
resultado: {
  fontSize: 18,
  marginTop: 20,
  fontWeight: '600',
},
error: {
  color: 'red',
  marginTop: 20,
},
title:{
  position: 'relative',
  marginTop: '-3%',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: normalize(18),
  marginBottom: '1%',
  justifyContent: 'center',
  alignItems: 'center',
},
titlecard: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
  marginTop: -10,
},
closed: {
 color: 'black',
 textAlign: 'center',
 fontSize: 18,
 fontWeight: '600',
},
labelResultado: {
  textAlign: 'center',
  justifyContent: 'center',
  fontSize: 18,
  fontWeight: 'bold',
},
subTit: {
  fontSize: 11,
  fontWeight: '100',
},
});

export default Conversor;
