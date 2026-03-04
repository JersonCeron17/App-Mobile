import React, { useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Separador visual con gradiente
function Divider() {
  return (
    <View style={styles.divisor}>
      <View style={styles.divisorLine} />
    </View>
  );
}

// Título de sección con efecto
function Seccion({ icono, titulo }: { icono: string; titulo: string }) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.seccionHeader, { transform: [{ scale: scaleValue }] }]}
      >
        <Text style={styles.seccionIcono}>{icono}</Text>
        <Text style={styles.seccionTitulo}>{titulo}</Text>
      </Animated.View>
    </Pressable>
  );
}

// Badge / Chip con colores dinámicos
const badgeColors = [
  { bg: "#E0F2FE", text: "#0369A1" },
  { bg: "#FEF08A", text: "#854D0E" },
  { bg: "#E0E7FF", text: "#3730A3" },
  { bg: "#FCD34D", text: "#78350F" },
  { bg: "#D1D5DB", text: "#374151" },
  { bg: "#FBCFE8", text: "#831843" },
];

function Badge({ texto, index = 0 }: { texto: string; index?: number }) {
  const [pressed, setPressed] = useState(false);
  const color = badgeColors[index % badgeColors.length];

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[styles.badge, { backgroundColor: color.bg }, pressed && styles.badgePressed]}
    >
      <Text style={[styles.badgeText, { color: color.text }]}>{texto}</Text>
    </Pressable>
  );
}

// Botón reutilizable con animación
function Boton({
  texto,
  onPress,
}: {
  texto: string;
  onPress: () => void;
}) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        style={styles.boton}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.botonTexto}>{texto}</Text>
      </Pressable>
    </Animated.View>
  );
}

// Campo de formulario mejorado
function Campo({
  label,
  placeholder,
  teclado = "default",
  icon,
}: {
  label: string;
  placeholder: string;
  teclado?: any;
  icon?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.campo}>
      <View style={styles.labelRow}>
        {icon && <Text style={styles.fieldIcon}>{icon}</Text>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        keyboardType={teclado}
        placeholderTextColor="#b4b4b4"
        style={[styles.input, focused && styles.inputFocused]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

// Tarjeta informativa mejorada
function Tarjeta({
  icono,
  titulo,
  descripcion,
  bgColor = "#FEF3C7",
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  bgColor?: string;
}) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: bgColor, transform: [{ scale: scaleValue }] },
        ]}
      >
        <View style={[styles.cardIconBg, { backgroundColor: bgColor }]}>
          <Text style={styles.cardIcon}>{icono}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{titulo}</Text>
          <Text style={styles.cardText}>{descripcion}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

// Mini tarjeta mejorada
function MiniCard(
  {
    icono,
    titulo,
    valor,
    bgColor = "#E0F2FE",
  }: {
    icono: string;
    titulo: string;
    valor: string;
    bgColor?: string;
  }
) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={[
          styles.miniCard,
          { backgroundColor: bgColor, transform: [{ scale: scaleValue }] },
        ]}
      >
        <Text style={styles.miniIcon}>{icono}</Text>
        <Text style={styles.miniTitle}>{titulo}</Text>
        <Text style={styles.miniValue}>{valor}</Text>
      </Animated.View>
    </Pressable>
  );
}

// Fila de resumen
function Estadistica({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function Index() {
  const [estado, setEstado] = useState("Disponible");

  const cambiarEstado = () => {
    setEstado((prev) =>
      prev === "Disponible" ? "En clase 👩‍💻" : "Disponible"
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER PERFIL */}
      <View style={styles.header}>
        <View style={styles.foto}>
          <Text style={styles.fotoPlaceholder}>👤</Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.nombre}>Nombre Apellido</Text>
          <Text style={styles.subtitulo}>Estudiante • React Native</Text>

          <View style={styles.estadoRow}>
            <Text style={styles.estadoLabel}>Estado:</Text>
            <Text style={styles.estado}>{estado}</Text>
          </View>

          <Boton texto="Cambiar estado" onPress={cambiarEstado} />
        </View>
      </View>

      {/* BADGES */}
      <View style={styles.badgesContainer}>
        <Badge texto="UI/UX" index={0} />
        <Badge texto="Expo" index={1} />
        <Badge texto="Componentes" index={2} />
        <Badge texto="Mobile" index={3} />
        <Badge texto="Diseño" index={4} />
        <Badge texto="Estilos" index={5} />
      </View>

      <Divider />

      {/* FORMULARIO */}
      <Seccion icono="📄" titulo="Datos del Perfil" />

      <Campo label="Nombre" placeholder="Ej: Andrea" icon="👤" />
      <Campo label="Apellido" placeholder="Ej: Benavides" icon="👤" />
      <Campo
        label="Correo"
        placeholder="Ej: correo@dominio.com"
        teclado="email-address"
        icon="✉️"
      />
      <Campo label="Ciudad" placeholder="Ej: Pasto" icon="📍" />
      <Campo
        label="Teléfono"
        placeholder="Ej: 3001234567"
        teclado="phone-pad"
        icon="📱"
      />
      <Campo
        label="Ocupación"
        placeholder="Ej: Estudiante / Desarrollador"
        icon="💼"
      />

      <Divider />

      {/* RESUMEN VISUAL */}
      <Seccion icono="🧩" titulo="Resumen Visual" />

      <View style={styles.miniGrid}>
        <MiniCard icono="📚" titulo="Curso" valor="Móvil" bgColor="#E0F2FE" />
        <MiniCard icono="⏳" titulo="Corte" valor="1" bgColor="#FEF3C7" />
        <MiniCard icono="✅" titulo="Avance" valor="UI" bgColor="#E0E7FF" />
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Resumen rápido</Text>
        <Estadistica label="Componentes usados" value="8+" />
        <Estadistica label="Pantallas" value="1" />
        <Estadistica label="Navegación" value="No" />
      </View>

      <Divider />

      {/* TARJETAS */}
      <Seccion icono="📌" titulo="Tarjetas Informativas" />

      <Tarjeta
        icono="⚙️"
        titulo="Habilidad principal"
        descripcion="Diseño de interfaces móviles limpias y organizadas."
        bgColor="#FEF3C7"
      />
      <Tarjeta
        icono="📱"
        titulo="Proyecto actual"
        descripcion="App tipo perfil usando componentes reutilizables."
        bgColor="#E0F2FE"
      />
      <Tarjeta
        icono="🚀"
        titulo="Meta del curso"
        descripcion="Aprender navegación, listas y formularios."
        bgColor="#E0E7FF"
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✅ Entrega: captura del emulador + link del repositorio.
        </Text>
        <Text style={styles.footerWarn}>
          📌 Base directa del parcial.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    gap: 14,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 5,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "linear-gradient(135deg, #667eea, #764ba2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#667eea",
  },

  fotoPlaceholder: {
    fontSize: 56,
  },

  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },

  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
  },

  subtitulo: {
    color: "#6B7280",
    marginBottom: 8,
    fontSize: 13,
  },

  estadoRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 10,
  },

  estadoLabel: {
    fontWeight: "bold",
  },

  estado: {
    color: "#FFF",
    fontSize: 12,
  },

  boton: {
    backgroundColor: "#667eea",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 16,
  },

  badge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 2,
  },

  badgePressed: {
    transform: [{ scale: 0.95 }],
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  divisor: {
    height: 1,
    marginVertical: 18,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  divisorLine: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
    paddingHorizontal: 16,
  },

  seccionIcono: {
    fontSize: 18,
  },

  seccionTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
  },

  campo: {
    marginBottom: 14,
    paddingHorizontal: 16,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },

  fieldIcon: {
    fontSize: 16,
  },

  label: {
    marginBottom: 0,
    fontWeight: "600",
    color: "#374151",
    fontSize: 14,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    elevation: 1,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    fontSize: 15,
    color: "#111827",
  },

  inputFocused: {
    borderColor: "#667eea",
    backgroundColor: "#F0F4FF",
    elevation: 3,
  },

  miniGrid: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
  },

  miniCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    elevation: 2,
    alignItems: "center",
  },

  miniIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  miniTitle: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  miniValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    color: "#667eea",
  },

  statsBox: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  statsTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 15,
    color: "#1F2937",
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },

  statLabel: {
    fontWeight: "600",
    color: "#6B7280",
    fontSize: 13,
  },

  statValue: {
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    color: "#667eea",
    fontWeight: "bold",
    fontSize: 13,
  },

  card: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    elevation: 2,
    alignItems: "center",
  },

  cardIconBg: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 28,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
  },

  cardText: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#667eea",
    borderRadius: 16,
    elevation: 3,
  },

  footerText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },

  footerWarn: {
    marginTop: 8,
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "500",
  },
});