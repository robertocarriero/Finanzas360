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

const CompraVenta = () => {
  const [monto, setMonto] = useState('');
  const [tipoMonedaBase, setTipoMonedaBase] = useState('Pesos Argentinos');
  const [tipoMonedaObjetivo, setTipoMonedaObjetivo] = useState('Pesos Argentinos');
  const [resultado, setResultado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('comprar'); // Nuevo estado para manejar el tipo de operación

  const handleMontoChange = (text) => {
    setMonto(text);
  };

  const handleTipoMonedaBaseChange = (value) => {
    setTipoMonedaBase(value);
  };

  const handleTipoMonedaObjetivoChange = (value) => {
    setTipoMonedaObjetivo(value);
  };

  const handleTipoOperacionChange = (value) => {
    setTipoOperacion(value);
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
    if (!monto) {
        Alert.alert('Por favor ingrese una cifra');
        return;
      }
  
      setLoading(true);
      setError('');
  
      const endpointBase = endpoints.find(item => item.label === tipoMonedaBase);
      const endpointObjetivo = endpoints.find(item => item.label === tipoMonedaObjetivo);
  
      if (tipoMonedaBase === 'Pesos Argentinos' && endpointObjetivo) {
        fetch(endpointObjetivo.url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`No se pudo obtener la cotización de ${tipoMonedaObjetivo}`);
            }
            return response.json();
          })
          .then(data => {
            const tasa = tipoOperacion === 'Compra' ? data.venta : data.compra;
            const resultado = parseFloat(monto) / parseFloat(tasa);
            const resultadoFormateado = formatNumber.nuevo(resultado);
            setResultado(resultadoFormateado);
            setLoading(false);
            setModalVisible(true);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
            console.error('Error al obtener la cotización:', error);
          });
      } else if (endpointBase && tipoMonedaObjetivo === 'Pesos Argentinos') {
        fetch(endpointBase.url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`No se pudo obtener la cotización de ${tipoMonedaBase}`);
            }
            return response.json();
          })
          .then(data => {
            const tasa = tipoOperacion === 'Compra' ? data.compra : data.venta;
            const resultado = parseFloat(monto) * parseFloat(tasa);
            const resultadoFormateado = formatNumber.nuevo(resultado);
            setResultado(resultadoFormateado);
            setLoading(false);
            setModalVisible(true);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
            console.error('Error al obtener la cotización:', error);
          });
      } else if (endpointBase && endpointObjetivo) {
        fetch(endpointBase.url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`No se pudo obtener la cotización de ${tipoMonedaBase}`);
            }
            return response.json();
          })
          .then(dataBase => {
            const tasaBase = tipoOperacion === 'Compra' ? dataBase.compra : dataBase.venta;
            fetch(endpointObjetivo.url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`No se pudo obtener la cotización de ${tipoMonedaObjetivo}`);
                }
                return response.json();
              })
              .then(dataObjetivo => {
                const tasaObjetivo = tipoOperacion === 'Compra' ? dataObjetivo.venta : dataObjetivo.compra;
                const resultado = (parseFloat(monto) * parseFloat(tasaBase)) / parseFloat(tasaObjetivo);
                const resultadoFormateado = formatNumber.nuevo(resultado);
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
        setError('No se encontró el endpoint para la moneda seleccionada');
        setLoading(false);
      }
    };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Compra Venta </Text>
        <Text style={styles.subTitle}>Elegir operación a realizar</Text>
        <Picker
          selectedValue={tipoOperacion}
          style={styles.pickerItem}
          onValueChange={(itemValue) => handleTipoOperacionChange(itemValue)}
        >
           
          <Picker.Item label="Comprar" value="comprar" />
          <Picker.Item label="Vender" value="vender" />
        </Picker>
        <Text style={styles.titlecard}>Monto:</Text>
        <TextInput
          style={styles.input}
          value={monto}
          onChangeText={handleMontoChange}
          keyboardType="numeric"
          placeholder="Ingrese el monto"
        />
        <Text style={styles.label}>Elegir Tipo de Moneda</Text>
        
        <Text style={styles.label}>Origen</Text>
        <Picker
          selectedValue={tipoMonedaBase}
          style={styles.pickerItem}
          onValueChange={(itemValue) => handleTipoMonedaBaseChange(itemValue)}
        >
          <Picker.Item label="Pesos Argentinos" value="Pesos Argentinos" />
          {endpoints.map((endpoint, index) => (
            <Picker.Item key={index} label={endpoint.label} value={endpoint.label} />
          ))}
        </Picker>
        <Text style={styles.label}>Destino</Text>
        <Picker
          selectedValue={tipoMonedaObjetivo}
          style={styles.pickerItem}
          onValueChange={(itemValue) => handleTipoMonedaObjetivoChange(itemValue)}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlecard: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    marginTop: 3,
    marginRight: 125,
  },
  input: {
    width: '94%',
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e6eae8',
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerItem: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#e6eae8',
    fontSize: normalize(16),
    color: 'black',
    fontWeight: '400',
  },
  button: {
    padding: 10,
    marginTop: 15,
    backgroundColor: '#e6eae8',
    elevation: 7,
    borderRadius:12,
    width: 100,
    height: 48,
    marginLeft: 'auto',
    marginBottom: '-0.2%',
    borderWidth: 2,
    borderColor: 'gray',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  subTitle:{
    fontSize: normalize(13),
    fontWeight: 'bold',
    marginLeft: 5,
  },

  label: {
    fontSize: normalize(13),
    fontWeight: 'bold',
    marginTop: 15,
  },
  labelResultado: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    marginTop: 20,
  },
  resultado: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonModal: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closed: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CompraVenta;
