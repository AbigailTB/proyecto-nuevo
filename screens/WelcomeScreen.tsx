import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Dimensions 
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Info: undefined;
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const goToLogin = (): void => {
    navigation.navigate('Login');
  };

  const goToInfo = (): void => {
    // Si tienes una pantalla de información
    if (navigation.navigate) {
      navigation.navigate('Info');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />
      
      {/* Fondo con formas decorativas */}
      <View style={styles.backgroundShapes}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>
      
      <View style={styles.contentContainer}>
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>
            Sistema de Control de Persianas Inteligentes
          </Text>
        </View>
        
        {/* Contenido principal */}
        <View style={styles.mainContent}>
          <Text style={styles.description}>
            Controla tus persianas inteligentes fácilmente desde cualquier lugar. Programa, automatiza y ahorra energía con nuestra tecnología inteligente.
          </Text>
        </View>
        
        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={goToLogin}
          >
            <Text style={styles.primaryButtonText}>Comenzar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={goToInfo}
          >
            <Text style={styles.secondaryButtonText}>Más información</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión 1.0</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

export default WelcomeScreen;