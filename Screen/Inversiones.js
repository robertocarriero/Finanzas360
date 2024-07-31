import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WebViewScreen from './WebView';

const Inversiones = () => {
  const navigation = useNavigation();

  const links = [
    { text: 'FINVIZ', texto: 'Plataforma con herramientas gratuitas de análisis técnico sobre inversiones.', url: 'https://finviz.com/' },
    { text: 'BOLSAR', texto: 'Portal con herramientas para análisis sobre inversiones en Argentina.', url: 'https://bolsar.info/' },
    { text: 'BYMA', texto: 'Portal con info financiera para el monitoreo del mercado Argentino.', url: 'https://open.bymadata.com.ar/', useLinking: true },
    { text: 'PUENTE', texto: 'Portal que desarrolla estrategias de inversión e info financiera.', url: 'https://www.puentenet.com/cotizaciones/acciones/' },
    { text: 'TW', texto: 'Tradingview, plataforma de análisis e info para inversores.', url: 'https://es.tradingview.com/markets/stocks-usa/market-movers-active/' },
    { text: 'BCBA', texto: 'Bolsa de Comercio de Buenos Aires, principal centro de negocios de Argentina.', url: 'https://www.labolsa.com.ar/' },
    { text: 'PPI', texto: 'Porfolio Personal Inversiones, te asesoran para invertir e info financiera.', url: 'https://www.portfoliopersonal.com/Cotizaciones/Bonos' },
    { text: 'CAFCI', texto: 'Cámara Argentina de Fondos de Inversión, Fondos Comunes de Inversión.', url: 'https://www.cafci.org.ar/' },
  ];

  const handlePress = (url, useLinking) => {
    if (useLinking) {
      Linking.openURL(url);
    } else {
      navigation.navigate('WebViewScreen', { url });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/www.png')} style={styles.imageGlo} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Portales Financieros</Text>
          <Text style={styles.subTit}>Son sitios web o aplicaciones que brindan una variedad de datos e información financieros, todo en un solo lugar</Text>
        </View>
        <View style={styles.linksContainer}>
          {links.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(link.url, link.useLinking)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{link.text}</Text>
              <Text style={styles.texto}>{link.texto}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
  },
  imageGlo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  subTit: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  linksContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    borderColor: '#ccc',
    elevation: 9,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Inversiones;
