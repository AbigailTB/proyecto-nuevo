import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Paleta de colores unificada para toda la aplicación
export const colors = {
  azulOscuro: '#001B2A',
  azulMedio: '#1B263B',
  azulClaro: '#415A77',
  azulPastel: '#778DA9',
  blanco: '#E0E1DD',
  negro: '#000000',
  
  // Colores adicionales de la aplicación
  verde: '#4CAF50',
  rojo: '#F44336',
  sensorTemp: '#C8FFD4',
  sensorLuz: '#E6E6BE',
  background: '#F5F7FB'
};

// Estilos para la pantalla de control
export const controlStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.azulOscuro,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blanco,
  },
  persianaContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  window: {
    width: width * 0.8,
    height: height * 0.28,
    borderWidth: 2,
    borderColor: '#888',
    backgroundColor: '#E1F5FE',
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
  },
  persiana: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#B0BEC5',
    borderBottomWidth: 1,
    borderBottomColor: '#546E7A',
  },
  sensorsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sensorCard: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
  },
  sensorLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  sensorValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sensorValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sensorIcon: {
    fontSize: 20,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: colors.azulOscuro,
    marginHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  statusValue: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: colors.blanco,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    paddingHorizontal: 20,
  },
  footerButtonText: {
    color: colors.azulClaro,
    fontSize: 14,
  },
});

// Estilos para la pantalla de login
export const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.blanco,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.azulOscuro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.blanco,
    fontSize: 28,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    color: colors.azulOscuro,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.azulClaro,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: colors.azulMedio,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.blanco,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.azulPastel,
    marginBottom: 20,
    fontSize: 16,
    color: colors.azulOscuro,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: colors.azulClaro,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.azulOscuro,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    color: colors.azulMedio,
    fontSize: 14,
  },
  registerText: {
    color: colors.azulClaro,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// Estilos para la pantalla de bienvenida
export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blanco,
  },
  backgroundShapes: {
    position: 'absolute',
    width: width,
    height: height,
  },
  circle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: `${colors.azulPastel}30`,
    top: -width * 0.2,
    right: -width * 0.2,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: `${colors.azulPastel}20`,
    bottom: height * 0.25,
    left: -width * 0.3,
  },
  circle3: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: `${colors.azulPastel}30`,
    bottom: -width * 0.1,
    right: width * 0.1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: colors.azulOscuro,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.azulClaro,
    marginTop: 10,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: colors.azulMedio,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  },
  primaryButton: {
    backgroundColor: colors.azulOscuro,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.azulMedio,
  },
  secondaryButtonText: {
    color: colors.azulMedio,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: colors.azulMedio,
    opacity: 0.6,
    fontSize: 12,
  },
});

// Estilos para la pantalla de inicio
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.azulClaro,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.azulOscuro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: colors.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  climateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperatureValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  humidityValue: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  weatherIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 15,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: '22%',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    color: colors.azulMedio,
  },
  devicesContainer: {
    marginBottom: 20,
  },
  deviceCard: {
    backgroundColor: colors.blanco,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 2,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.azulPastel,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceIcon: {
    fontSize: 20,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deviceStatus: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  deviceAction: {
    backgroundColor: colors.azulPastel,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  deviceActionText: {
    color: colors.azulOscuro,
    fontSize: 12,
    fontWeight: '500',
  },
  addDeviceButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.azulMedio,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  addDeviceText: {
    color: colors.azulMedio,
    fontSize: 16,
    fontWeight: '500',
  },
});

// Estilos para la pantalla de configuración
export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: colors.azulOscuro,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.blanco,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.azulOscuro,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: colors.rojo,
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.azulMedio,
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.azulMedio,
    fontSize: 16,
  },
});

// Exportar todos los estilos
export default {
  colors,
  controlStyles,
  loginStyles,
  welcomeStyles,
  homeStyles,
  settingsStyles
};