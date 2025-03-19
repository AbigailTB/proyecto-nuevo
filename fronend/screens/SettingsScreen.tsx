import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { colors } from '../styles';

const SettingsScreen: React.FC = () => {
  const handleButtonPress = (action: string) => {
    switch (action) {
      case 'changeName':
        Alert.alert('Cambiar Nombre', 'Aquí podrías mostrar un formulario para cambiar el nombre');
        break;
      case 'addAccount':
        Alert.alert('Añadir Cuenta', 'Aquí podrías mostrar un formulario para añadir una cuenta');
        break;
      case 'deleteAccount':
        Alert.alert(
          'Eliminar Cuenta',
          '¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Cuenta eliminada') }
          ]
        );
        break;
      case 'logout':
        Alert.alert('Cerrar Sesión', 'Has cerrado sesión');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.azulPastel} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Configuraciones</Text>
      </View>
      
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleButtonPress('changeName')}
          >
            <Text style={styles.buttonText}>Cambiar Nombre</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleButtonPress('addAccount')}
          >
            <Text style={styles.buttonText}>Añadir Cuenta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]}
            onPress={() => handleButtonPress('deleteAccount')}
          >
            <Text style={[styles.buttonText, styles.dangerButtonText]}>Eliminar Cuenta</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => handleButtonPress('logout')}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.azulPastel,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    color: colors.azulOscuro,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.azulMedio,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '85%',
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
  buttonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#E74C3C',
    marginTop: 25,
  },
  dangerButtonText: {
    color: colors.blanco,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.azulMedio,
    padding: 15,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.azulMedio,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;