import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../context/UserContext";

// Datos simulados
const mockData = {
  points: 1250,
  level: 15,
  ranking: 42,
  activeDays: 28,
  unlockedAchievements: 8,
  recentActivities: [
    { id: 1, action: "Completó lección", time: "2h ago" },
    { id: 2, action: "Ganó puntos", time: "5h ago" },
    { id: 3, action: "Actualizó perfil", time: "1d ago" },
  ],
  favorites: ["React", "JavaScript", "Mobile Dev"],
  notifications: 3,
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useUser();

  if (!user) {
    navigation.navigate("Login" as never);
    return null;
  }

  const handleEditProfile = () => {
    navigation.navigate("EditProfile" as never);
  };

  const handleSettings = () => {
    Alert.alert("Configuración", "Funcionalidad próximamente disponible.");
  };

  const handleHelp = () => {
    Alert.alert("Ayuda", "Funcionalidad próximamente disponible.");
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sí", onPress: () => navigation.navigate("Login" as never) },
    ]);
  };

  return (
    <LinearGradient colors={["#a8edea", "#fed6e3", "#d299c2", "#fef9d7"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Banner */}
        <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.banner}>
          <Text style={styles.bannerText}>¡Bienvenido de vuelta!</Text>
        </LinearGradient>

        {/* Imagen de perfil grande */}
        <View style={styles.profileSection}>
          <Image source={{ uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Felix&w=150&h=150" }} style={styles.profileImageLarge} />
          <Text style={styles.welcomeTitle}>¡Hola, {user.name}!</Text>
        </View>

        {/* Estadísticas expandidas */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={30} color="#ffd700" />
            <Text style={styles.statNumber}>{mockData.points}</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={30} color="#ff6b6b" />
            <Text style={styles.statNumber}>{mockData.level}</Text>
            <Text style={styles.statLabel}>Nivel</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="podium" size={30} color="#4a90e2" />
            <Text style={styles.statNumber}>#{mockData.ranking}</Text>
            <Text style={styles.statLabel}>Ranking</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={30} color="#27ae60" />
            <Text style={styles.statNumber}>{mockData.activeDays}</Text>
            <Text style={styles.statLabel}>Días Activos</Text>
          </View>
        </View>

        {/* Tarjetas de contenido */}
        <View style={styles.cardsContainer}>
          {/* Logros */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="medal" size={24} color="#ffd700" />
              <Text style={styles.cardTitle}>Logros</Text>
            </View>
            <Text style={styles.cardText}>{mockData.unlockedAchievements} logros desbloqueados</Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Ver Todos</Text>
            </TouchableOpacity>
          </View>

          {/* Progreso */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="bar-chart" size={24} color="#ff6b6b" />
              <Text style={styles.cardTitle}>Progreso</Text>
            </View>
            <Text style={styles.cardText}>75% completado este mes</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Actividades Recientes */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="time" size={24} color="#4a90e2" />
              <Text style={styles.cardTitle}>Actividades Recientes</Text>
            </View>
            {mockData.recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Text style={styles.activityText}>{activity.action}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>

          {/* Configuración Rápida */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="settings" size={24} color="#e74c3c" />
              <Text style={styles.cardTitle}>Configuración Rápida</Text>
            </View>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="notifications" size={20} color="#666" />
              <Text style={styles.settingText}>Notificaciones</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="moon" size={20} color="#666" />
              <Text style={styles.settingText}>Modo Oscuro</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Notificaciones */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="notifications" size={24} color="#27ae60" />
              <Text style={styles.cardTitle}>Notificaciones</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{mockData.notifications}</Text>
              </View>
            </View>
            <Text style={styles.cardText}>Tienes {mockData.notifications} notificaciones nuevas</Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Ver Todas</Text>
            </TouchableOpacity>
          </View>

          {/* Favoritos */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="heart" size={24} color="#e91e63" />
              <Text style={styles.cardTitle}>Favoritos</Text>
            </View>
            <View style={styles.favoritesContainer}>
              {mockData.favorites.map((item, index) => (
                <View key={index} style={styles.favoriteItem}>
                  <Text style={styles.favoriteText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Ionicons name="create" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
            <Ionicons name="settings" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleHelp}>
            <Ionicons name="help-circle" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
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
    padding: 20,
  },
  banner: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  bannerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  cardsContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  badge: {
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  cardButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    width: "75%",
    height: "100%",
    backgroundColor: "#27ae60",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    color: "#333",
  },
  activityTime: {
    fontSize: 12,
    color: "#666",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  favoritesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  favoriteItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  favoriteText: {
    fontSize: 14,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#667eea",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "48%",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});