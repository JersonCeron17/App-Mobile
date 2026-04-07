import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabIndex() {
  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Ionicons name="home" size={60} color="#fff" />
          <Text style={styles.title}>Inicio</Text>
        </View>

        <View style={styles.card}>
          <Image source={require("../../assets/images/react-logo@2x.png")} style={styles.cardImage} />
          <Ionicons name="information-circle" size={30} color="#4a90e2" />
          <Text style={styles.cardTitle}>Bienvenido</Text>
          <Text style={styles.cardText}>Esta es la pestaña principal de la aplicación. Explora las funciones disponibles.</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="person" size={30} color="#e74c3c" />
          <Text style={styles.cardTitle}>Perfil</Text>
          <Text style={styles.cardText}>Accede a tu perfil personal y configura tus preferencias.</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="settings" size={30} color="#27ae60" />
          <Text style={styles.cardTitle}>Configuración</Text>
          <Text style={styles.cardText}>Ajusta la configuración de la app según tus necesidades.</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <LinearGradient colors={["#ff6b6b", "#ffa726"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Explorar Más</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});
