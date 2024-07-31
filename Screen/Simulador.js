import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert,Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Simulador = () => {
  const [capital, setCapital] = useState('');
  const [tasaNominalAnual, setTasaNominalAnual] = useState('');
  const [dias, setDias] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mostrarAlertaLimpieza, setMostrarAlertaLimpieza] = useState(false);

  const calcularInteres = () => {
    // Verificar si los valores son numéricos
    if (!capital.trim() || !tasaNominalAnual.trim() || !dias.trim()) {
      Alert.alert('Error', 'Completa todos los campos con valores numéricos válidos.');
      return;
    }

    const monto = parseFloat(capital) * (1 + (parseFloat(tasaNominalAnual) / 100 / 365) * parseFloat(dias));
    const im = parseFloat(tasaNominalAnual) / 12;
    setResultado({
      monto: formatNumber(monto.toFixed(2)),
      interes: formatNumber((monto - parseFloat(capital)).toFixed(2)),
      tasaMensual: im.toFixed(2)
    });
  };

  const limpiarCampos = () => {
    Alert.alert(
      'Confirmar Borrar Datos',
      '¿Estás seguro de que deseas borrar los datos ingresados?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado') },
        { text: 'Confirmar', onPress: confirmarLimpieza },
      ],
      { cancelable: true }
    );
  };
  
  const confirmarLimpieza = () => {
    setCapital('');
    setTasaNominalAnual('');
    setDias('');
    setResultado(null);
    setMostrarAlertaLimpieza(false);
    Alert.alert( 'Los datos han sido borrados.');
  };


  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Simulador de Plazo Fijo</Text>
        <TextInput
          style={styles.input}
          placeholder="Capital a depositar"
          keyboardType="numeric"
          value={capital}
          onChangeText={text => setCapital(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tasa nominal anual (%)"
          keyboardType="numeric"
          value={tasaNominalAnual}
          onChangeText={text => setTasaNominalAnual(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Días de depósito"
          keyboardType="numeric"
          value={dias}
          onChangeText={text => setDias(text)}
        />
        <View style={styles.buttonCont}>
          <TouchableOpacity style={styles.button} onPress={calcularInteres}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonA} onPress={limpiarCampos}>
            <Text style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={resultado !== null} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Resultado:</Text>
            <Text style={styles.item}>Monto final:  $ {resultado?.monto}</Text>
            <Text style={styles.item}>Interés ganado:  $ {resultado?.interes}</Text>
            <Text style={styles.item}>Tasa mensual:  {resultado?.tasaMensual} %</Text>
            <TouchableOpacity style={styles.closed} onPress={() => setResultado(null)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    elevation: 10,
  },
  input: {
    width: '100%',
    height: 48,
    marginBottom: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#e6eae8',
    borderRadius: 7,
    borderColor: '#ccc',
    elevation: 5,
    marginBottom: 15,
    color: 'black',
    fontWeight: '700',
  },
  buttonCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e6eae8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 8,
    width: '40%',
    height: 48,
    borderWidth: 2,
    borderColor: 'gray',
  },
  buttonA: {
    backgroundColor: '#e6eae8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
    width: '40%',
    height: 48,
    borderWidth: 2,
    borderColor: 'gray',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 10,
    alignItems: 'center',
    borderColor: '#ccc',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '400',
  },
  closed: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    width: 120,
    borderWidth: 2,
    borderColor: 'gray',
  },
});

export default Simulador;

