import React, { useState, useEffect } from 'react';
import { 
  View, Text, ScrollView, TextInput, StyleSheet, Alert, 
  TouchableOpacity, KeyboardAvoidingView, Platform, 
  TouchableWithoutFeedback, Keyboard, Dimensions, Modal, Button 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const BudgetApp = () => {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [income, setIncome] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [incomeEntries, expenses]);

  const loadData = async () => {
    try {
      const savedIncomeEntries = await AsyncStorage.getItem('incomeEntries');
      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedIncomeEntries) setIncomeEntries(JSON.parse(savedIncomeEntries));
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('incomeEntries', JSON.stringify(incomeEntries));
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const resetData = async () => {
    try {
      await AsyncStorage.removeItem('incomeEntries');
      await AsyncStorage.removeItem('expenses');
      setIncomeEntries([]);
      setExpenses([]);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const confirmReset = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas borrar todos los datos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', onPress: resetData },
      ]
    );
  };

  const addIncome = () => {
    if (!income) {
      Alert.alert('Error', 'Por favor, ingresa un monto válido');
      return;
    }
    const newIncomeEntries = [...incomeEntries, parseFloat(income)];
    setIncomeEntries(newIncomeEntries);
    setIncome('');
    Keyboard.dismiss();
  };

  const addExpense = () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Por favor, ingresa una categoría y un monto válido');
      return;
    }
    
    const normalizedCategory = category.trim().toLowerCase();
    const amountValue = parseFloat(amount);
    const date = new Date().toLocaleDateString(); // Obtener la fecha actual
    const existingExpenseIndex = expenses.findIndex(expense => expense.category === normalizedCategory);
    
    if (existingExpenseIndex >= 0) {
      const newExpenses = expenses.map((expense, index) => {
        if (index === existingExpenseIndex) {
          return {
            ...expense,
            amount: expense.amount + amountValue,
            //date: date, // Actualizar la fecha del gasto
          };
        }
        return expense;
      });
      setExpenses(newExpenses);
    } else {
      const newExpenses = [...expenses, { category: normalizedCategory, amount: amountValue, date: date }];
      setExpenses(newExpenses);
    }
    
    setCategory('');
    setAmount('');
    Keyboard.dismiss();
  };

  const formatNumber = (number) => {
    return number.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, item) => total + item.amount, 0);
  };

  const calculateTotalIncome = () => {
    return incomeEntries.reduce((total, amount) => total + amount, 0);
  };

  const calculateRemainingIncome = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  const getChartData = () => {
    const data = expenses.reduce((acc, item) => {
      const found = acc.find(exp => exp.name === item.category);
      if (found) {
        found.amount += item.amount;
      } else {
        acc.push({ name: item.category, amount: item.amount });
      }
      return acc;
    }, []);
  
    return data.map((item, index) => ({
      name: item.name,
      amount: item.amount,
      color: `hsl(${index * 60}, 100%, 50%)`,
      legendFontColor: 'black',
      legendFontSize: 15,
    }));
  };

  const getExpenseList = () => {
    return expenses.map((expense, index) => (
      <View key={index} style={styles.expenseItem}>
        <Text style={styles.expenseText}>{expense.category}: $ {formatNumber(expense.amount)}</Text>
        <Text style={styles.expenseText}>Fecha: {expense.date}</Text>
      </View>
    ));
  };

  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const handleCategoryChange = (text) => {
    if (income) {
      Alert.alert(
        'Atención',
        'Tienes un ingreso sin confirmar. ¿Deseas confirmarlo o borrarlo?',
        [
          { text: 'Confirmar', onPress: addIncome },
          { text: 'Borrar', onPress: () => setIncome('') },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } else {
      setCategory(text);
    }
  };

  const handleAmountChange = (text) => {
    if (income) {
      Alert.alert(
        'Atención',
        'Tienes un ingreso sin confirmar. ¿Deseas confirmarlo o borrarlo?',
        [
          { text: 'Confirmar', onPress: addIncome },
          { text: 'Borrar', onPress: () => setIncome('') },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } else {
      setAmount(text);
    }
  };

  const handleIncomeChange = (text) => {
    if (category || amount) {
      Alert.alert(
        'Atención',
        'Tienes un gasto sin confirmar. ¿Deseas confirmarlo o borrarlo?',
        [
          { text: 'Confirmar', onPress: addExpense },
          { text: 'Borrar', onPress: () => { setCategory(''); setAmount(''); } },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } else {
      setIncome(text);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <Text style={styles.title}>Presupuesto Personal</Text>
            <Text style={styles.summary}>Ingresos Totales: $ {formatNumber(calculateTotalIncome()) || '0,00'}</Text>
            <Text style={styles.summaryGas}>Gastos Totales: $ {formatNumber(calculateTotalExpenses())}</Text>
            <Text style={styles.summary}>Saldo: $ {formatNumber(calculateRemainingIncome()) || '0,00'}</Text>
            <Text style={styles.subTitulos}>Añadir Ingresos</Text>
            <TextInput
              placeholder="Ingresos"
              keyboardType="numeric"
              style={styles.input}
              value={income}
              onChangeText={handleIncomeChange}
              onSubmitEditing={addIncome} // Añadir ingreso al presionar Enter
            />
            <Text style={styles.subTitulosGas}>Añadir Gastos</Text>
            <TextInput
              placeholder="Descripción del Gasto"
              style={styles.input}
              value={category}
              onChangeText={handleCategoryChange}
              onSubmitEditing={addExpense} // Añadir gasto al presionar Enter
            />
            <TextInput
              placeholder="Importe del Gasto"
              keyboardType="numeric"
              style={styles.input}
              value={amount}
              onChangeText={handleAmountChange}
              onSubmitEditing={addExpense} // Añadir gasto al presionar Enter
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.resetButton]} onPress={confirmReset}>
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.chartButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>Gráfico</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.lista}>
              <Text style={styles.listado}>Lista de Gastos</Text>
              {getExpenseList()}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      
      {/* Modal del gráfico */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        < View style={styles.modalView}>
            <Text style={styles.titleModal}>Gráfico de Gastos</Text>
            <Text style={styles.summary}>Ingresos Totales: $ {formatNumber(calculateTotalIncome()) || '0,00'}</Text>
            <Text style={styles.summaryGasModal}>Gastos Totales: $ {formatNumber(calculateTotalExpenses())}</Text>
            
          <PieChart
            data={getChartData()}
            width={Dimensions.get('window').width - 40}
            height={270}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="20"
            absolute
          />
           <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
       </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: { 
    padding: 20,
    justifyContent: 'space-between',
  },
  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '1%',
    textAlign: 'center',
    
  },
  subTitulos: {
    marginTop: '6%',
    fontWeight: '700',
  },
  subTitulosGas: {
    fontWeight: '700'
  },
  input: { 
    height: 48,
    borderColor: 'gray',
    backgroundColor:'#e6eae8',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  summary: { 
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 0.1,
    elevation: 10,
  },
  summaryGas:{
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 0.2,
    color: 'red',
    elevation: 10,
  },
  summaryGasModal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '1%',
    marginTop: '1%',
    color: 'red',
    elevation: 10,
  },
  buttonContainer:{
    flexDirection: 'row',
  },
  buttonText: { 
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    padding: 'auto',
  },
  resetButton: {
    backgroundColor: '#e6eae8',
    width: '35%',
    elevation: 12,
    padding: 10,
    borderRadius: 9,
    alignItems: 'center',
    marginLeft: '55%',
    height: '80%',
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: '4%',
  },
  chartButton: {
    backgroundColor: '#e6eae8',
    width: '35%',
    elevation: 12,
    padding: 10,
    borderRadius: 9,
    alignItems: 'center',
    height: '80%',
    marginLeft: '5%',
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: '4%',
  },
  closeButton: {
    backgroundColor: '#e6eae8',
    width: '30%',
    elevation: 12,
    borderRadius: 9,
    alignItems: 'center',
    height: '7%',
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: '-2%',
    fontWeight:'900',
    textAlign: 'center'
  },
  closeButtonText: {
    fontWeight: '900',
    paddingTop: '8%'
  },
  lista: {
    marginTop: '7%',
  },
  listado: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: '3%'
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  expenseText: { 
    fontSize: 12,
    marginRight:'5%',
    
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ced9e8',
    padding: 20,
  },
  titleModal: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '-18%',
    textAlign: 'center',
  },
 
});

export default BudgetApp;
