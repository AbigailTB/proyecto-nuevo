import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { loginUser, setLoggedInUser, getLoggedInUser, initDB } from '../database/db';

// Colores basados en la paleta proporcionada
const colors = {
  azulOscuro: '#001B2A',
  azulMedio: '#1B263B',
  azulClaro: '#415A77',
  azulPastel: '#778DA9',
  blanco: '#E0E1DD',
  negro: '#000000'
};

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      try {
        await initDB();
        const loggedInUser = await getLoggedInUser();
        if (loggedInUser) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      }
    };
    
    checkLogin();
  }, [navigation]);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const isAuthenticated = await loginUser(email, password);
      if (isAuthenticated) {
        await setLoggedInUser(email);
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al iniciar sesión');
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
          
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="usuario@ejemplo.com"
            placeholderTextColor={colors.azulPastel}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.azulPastel}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.blanco} size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default LoginScreen;