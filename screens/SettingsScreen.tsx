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
import { logoutUser } from '../database/db';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
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
        // Implementa la lógica de cierre de sesión
        logoutUser().then(() => {
          Alert.alert('Sesión cerrada', 'Has cerrado sesión');
          navigation.navigate('Login');
        }).catch(error => {
          console.error('Error al cerrar sesión:', error);
        });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.azulPastel} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Configuración</Text>
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
      
      {/* Footer de navegación */}
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.rojo,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: colors.blanco,
  },
  footerButton: {
    paddingHorizontal: 15,
  },
  footerButtonText: {
    color: colors.azulClaro,
    fontSize: 14,
  },
  activeFooterButton: {
    borderTopWidth: 2,
    borderTopColor: colors.azulClaro,
  },
  activeFooterButtonText: {
    color: colors.azulOscuro,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;