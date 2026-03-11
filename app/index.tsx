import { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {

  const [estado, setEstado] = useState("Disponible");

  return (
    <ScrollView style={styles.container}>

      <Image
        source={require("./assets/perfil.jpg")}
        style={styles.imagen}
      />

      <Text style={styles.titulo}>Título principal</Text>
      <Text style={styles.subtitulo}>Subtítulo de la aplicación</Text>

      <Text style={styles.estado}>Estado: {estado}</Text>

      <View style={styles.boton}>
        <Button
          title="Cambiar estado"
          onPress={() => setEstado(estado === "Disponible" ? "Ocupado" : "Disponible")}
        />
      </View>

      <TextInput style={styles.input} placeholder="Nombre" />
      <TextInput style={styles.input} placeholder="Apellido" />
      <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" />

      <View style={styles.card}>
        <Text style={styles.cardText}>Tarjeta 1</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Tarjeta 2</Text>
      </View>

      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>Badge 1</Text>
        <Text style={styles.badge}>Badge 2</Text>
        <Text style={styles.badge}>Badge 3</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    padding:20,
    backgroundColor:"#f2f2f2"
  },

  imagen:{
    width:120,
    height:120,
    borderRadius:60,
    alignSelf:"center",
    marginBottom:10
  },

  titulo:{
    fontSize:26,
    fontWeight:"bold",
    textAlign:"center"
  },

  subtitulo:{
    textAlign:"center",
    color:"gray",
    marginBottom:10
  },

  estado:{
    textAlign:"center",
    marginBottom:10,
    fontWeight:"bold"
  },

  boton:{
    marginBottom:20
  },

  input:{
    backgroundColor:"white",
    padding:12,
    borderRadius:8,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#ddd"
  },

  card:{
    backgroundColor:"white",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    elevation:3
  },

  cardText:{
    fontSize:16
  },

  badgeContainer:{
    flexDirection:"row",
    gap:10,
    marginTop:10
  },

  badge:{
    backgroundColor:"#3498db",
    color:"white",
    padding:8,
    borderRadius:20
  }

});