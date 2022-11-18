import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Pressable, Text, Modal, View, TouchableOpacity, TextInput, Alert, ImageBackground, Dimensions, Image  } from 'react-native';
import bg from './assets/images/pokemon.jpg';

// Dimenciones de pantalla
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('Buscar Pokemon');
  const [textPokemon, setTextPokemon] = useState(null);

  // State Pokemon
  const [results, setResults] = useState({
    name: "",
    image: "",
    id: "",
    type: ""
  });

  var buscarPokemon = async () => {

    if(textPokemon == null || textPokemon == ""){
      Alert.alert("Error", "Ingrese el nombre de un pokemon.");
      return;
    }

    setSearchText('Cargando...');

    try {

      const myObject = await fetch(`https://pokeapi.co/api/v2/pokemon/${textPokemon.toLowerCase()}`);
      const data = await myObject.json();

      // if(dataText == "Not Found"){
      //   Alert.alert("Error", "Pokemon Not Found");
      //   return;
      // }



      setResults(() => {
        return {
          name: data.name, 
          image: data.sprites.front_default,
          id: data.id,
          type: data.types[0].type.name
        }
      })

      setModalVisible(true);
      setSearchText('Buscar Pokemon');
      
    } catch (error) {
      Alert.alert("Error", "Pokemon Not Found");
      setSearchText('Buscar Pokemon');
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode='cover' style={styles.image}>
        <Text style={styles.fontTitle}>Buscador <Text style={styles.fontSubTitle}>Pokemon</Text></Text>
        
        
        <TextInput onChangeText={setTextPokemon} value={textPokemon} style={styles.textInput} placeholder="Ingrese el nombre de un pokemon..."/>
        <TouchableOpacity style={styles.searchPokemonBtn} onPress={() => buscarPokemon(textPokemon)}>
          <Text style={styles.searchPokemonBtnFonts}>{searchText}</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </ImageBackground>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {/* MODAL */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Datos del Pokemon</Text>
            <Image source={{uri: results.image }} style={styles.pokeImg}/>
            <Text style={styles.pokeText}>{results.name.toUpperCase()}</Text>
            <Text style={styles.pokeID}>ID: {results.id}</Text>
            <Text style={styles.pokeType}>Type: {results.type.toUpperCase()}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar Modal</Text>
            </Pressable>
          </View>
        </View>
        {/* FIN MODAL */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  textInput: {
    margin: 20,
    padding: 10,
    height: 40,
    width: 300,
    backgroundColor: '#ecf0f1'
  },
  fontTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  fontSubTitle: {
    color: '#f1c40f',
    fontSize: 40,
    fontWeight: 'bold'
  },
  searchPokemonBtn: {
    backgroundColor: '#c0392b',
    width: 200,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  searchPokemonBtnFonts: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  image: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 30,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  pokeImg: {
    width: 200,
    height: 200
  },
  pokeText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -20
  },
  pokeID: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: 'bold'

  },
  pokeType: {
    fontSize: 25,
    marginBottom: 35,
    fontWeight: 'bold'

  },
});
