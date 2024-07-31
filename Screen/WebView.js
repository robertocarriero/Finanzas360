import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity , Image} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>

    <View >
      <TouchableOpacity onPress={handleGoBack} style={styles.button}>
      <View >
        <Image source={require('../assets/casa.png')} style={styles.imageGlo} />
      </View>
        <Text style={styles.texto}>Volver</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  texto:{
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 30,
    marginLeft: '43.8%',
   
  },
  imageGlo: {
    width: 30,
    height: 30,
    marginLeft: '45%',
    marginBottom: -3,
    marginTop: 10,
    
  },
});

export default WebViewScreen;
