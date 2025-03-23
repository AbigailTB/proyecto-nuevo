import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../styles';

// Define las rutas de navegación de manera consistente
type RootStackParamList = {
  Home: undefined;
  Account: undefined;
  Settings: undefined;
  EditAccount: undefined;
  Schedule: undefined;
  Room: undefined;
  Login: undefined;
  AddAccount: undefined;
};

type EditAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditAccount'>;

type Props = {
  navigation: EditAccountScreenNavigationProp;
};

const EditAccountScreen: React.FC<Props> = ({ navigation }) => {
  // Estados para el formulario
  const [name, setName] = useState('Usuario JADA');
  const [email, setEmail] = useState('usuario@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');

  // Función para validar el nombre
  const validateName = (name: string) => {
    if (!name || name.trim().length === 0) {
      setNameError('El nombre no puede estar vacío');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  // Función para manejar la actualización de la cuenta
  const handleUpdateAccount = () => {
    if (!validateName(name)) {
      return;
    }

    setIsSubmitting(true);

    // Simulamos una operación asíncrona
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mostrar alerta de éxito y navegar de vuelta a Settings
      Alert.alert(
        "Cuenta Actualizada",
        "Tus datos han sido actualizados correctamente",
        [
          { text: "OK", onPress: () => navigation.navigate('Settings') }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.azulPastel} />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Cuenta</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre Completo *</Text>
            <TextInput
              style={[styles.input, nameError ? styles.inputError : null]}
              value={name}
              onChangeText={setName}
              placeholder="Ingresa tu nombre completo"
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Ingresa tu correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
            />
            <Text style={styles.helperText}>El correo electrónico no se puede editar</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Ingresa tu número de teléfono"
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
          
          <TouchableOpacity 
            style={styles.changePasswordButton}
            onPress={() => {
              Alert.alert(
                "Cambiar Contraseña",
                "Se enviará un enlace a tu correo electrónico para cambiar tu contraseña",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Enviar", onPress: () => {
                    Alert.alert("Enlace Enviado", "Revisa tu correo electrónico para cambiar tu contraseña");
                  }}
                ]
              );
            }}
          >
            <Text style={styles.changePasswordButtonText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting ? styles.disabledButton : null]}
          onPress={handleUpdateAccount}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Guardar Cambios</Text>
          )}
        </TouchableOpacity>
        
        <Text style={styles.requiredText}>* Campos obligatorios</Text>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.footerButtonText}>Programar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('Room')}
        >
          <Text style={styles.footerButtonText}>Habitación</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.activeFooterButton]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={[styles.footerButtonText, styles.activeFooterButtonText]}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background || '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.azulPastel || '#e6edf2',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.azulMedio || '#0277bd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro || '#172b4d',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30, // Extra padding to ensure all content is visible
  },
  formSection: {
    backgroundColor: colors.blanco || '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro || '#172b4d',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: colors.rojo || '#e53935',
  },
  errorText: {
    color: colors.rojo || '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  changePasswordButton: {
    backgroundColor: colors.azulClaro || '#64b5f6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  changePasswordButtonText: {
    color: colors.blanco || '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.azulMedio || '#0277bd',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  submitButtonText: {
    color: colors.blanco || '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  requiredText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: colors.blanco || '#fff',
  },
  footerButton: {
    paddingHorizontal: 15,
  },
  footerButtonText: {
    color: colors.azulClaro || '#64b5f6',
    fontSize: 14,
  },
  activeFooterButton: {
    borderTopWidth: 2,
    borderTopColor: colors.azulClaro || '#64b5f6',
  },
  activeFooterButtonText: {
    color: colors.azulOscuro || '#172b4d',
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;