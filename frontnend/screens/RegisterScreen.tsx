import React, { useState } from 'react';
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
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { registerUser, initDB } from '../database/db';

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
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (): Promise<void> => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    
    // Validación simple de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Introduce un correo electrónico válido');
      return;
    }
    
    // Validación de contraseña
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await initDB();
      const isRegistered = await registerUser(nombre, email, password);
      if (isRegistered) {
        Alert.alert(
          'Registro exitoso', 
          'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Error', 'Este correo electrónico ya está registrado');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al crear la cuenta');
      console.error('Error en registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>
            
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>LOGO</Text>
            </View>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>Regístrate para disfrutar de todos los beneficios</Text>
            
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Juan Pérez"
              placeholderTextColor={colors.azulPastel}
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
            />
            
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
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor={colors.azulPastel}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            
            <Text style={styles.inputLabel}>Confirmar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirma tu contraseña"
              placeholderTextColor={colors.azulPastel}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            
            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.buttonDisabled]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.blanco} size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Crear Cuenta</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    zIndex: 1,
  },
  backButtonText: {
    color: colors.azulClaro,
    fontSize: 16,
    fontWeight: '500',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.azulOscuro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.blanco,
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
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
  registerButton: {
    backgroundColor: colors.azulOscuro,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    marginTop: 10,
  },
  footerText: {
    color: colors.azulMedio,
    fontSize: 14,
  },
  loginText: {
    color: colors.azulClaro,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;