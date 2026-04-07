import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Alert, Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../context/UserContext";

// Función para validar email
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigation = useNavigation();
  const { setUser } = useUser();

  const buttonScale = useRef(new Animated.Value(1)).current;

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (email.trim() && !isValidEmail(email)) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (password && password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Guardar datos del usuario en el contexto (pueden estar vacíos)
      setUser({ name: name.trim() || "Usuario", email: email.trim() || "", password });

      // Animación del botón
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate("Profile" as never);
      });
    } else {
      Alert.alert("Error", "Por favor, corrige los errores en el formulario.");
    }
  };

  const handleGuestLogin = () => {
    setUser({ name: "Invitado", email: "", password: "" });
    navigation.navigate("Profile" as never);
  };

  const handleCreateAccount = () => {
    Alert.alert("Crear Cuenta", "Funcionalidad próximamente disponible.");
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2", "#f093fb", "#f5576c"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Imagen ilustrativa */}
        <Image source={require("../../assets/images/react-logo.png")} style={styles.illustration} />

        <View style={styles.logoContainer}>
          <Ionicons name="person-circle" size={60} color="#fff" />
          <Text style={styles.appTitle}>Mi App</Text>
        </View>

        {/* Tarjetas decorativas */}
        <View style={styles.decorativeCards}>
          <View style={styles.card}>
            <Ionicons name="shield-checkmark" size={30} color="#4a90e2" />
            <Text style={styles.cardText}>Seguro</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="speedometer" size={30} color="#e74c3c" />
            <Text style={styles.cardText}>Rápido</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="heart" size={30} color="#27ae60" />
            <Text style={styles.cardText}>Amigable</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Inicio de Sesión</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre (opcional)"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo (opcional)"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              keyboardType="email-address"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña (opcional)"
              placeholderTextColor="#999"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              secureTextEntry
            />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
              <LinearGradient colors={["#ff6b6b", "#ffa726"]} style={styles.button}>
                <Text style={styles.buttonText}>Siguiente</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Botones adicionales */}
          <TouchableOpacity style={styles.secondaryButton} onPress={handleGuestLogin}>
            <Text style={styles.secondaryButtonText}>Continuar como invitado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleCreateAccount}>
            <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    padding: 20,
  },
  illustration: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  decorativeCards: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    width: 80,
  },
  cardText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 15,
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
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
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});