import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { colors } from '../styles';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azulOscuro} />
      
      {/* Header con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Configuración</Text>
        <View style={styles.placeholder}></View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Opciones de cuenta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => navigation.navigate('EditAccount')}
          >
            <Text style={styles.optionText}>Nombre</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('EditAccount')}
            >
              <Text style={styles.editButtonText}>Cambiar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        {/* Opciones de privacidad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidad</Text>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Proteger mi información</Text>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleButton}></View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Opciones de notificaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Alertas de clima</Text>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleButton}></View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Recordatorios</Text>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleButton}></View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Opciones de ayuda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayuda</Text>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Centro de ayuda</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Contáctanos</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Opciones de cuenta */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountButtonText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
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
  container: {
    flex: 1,
    backgroundColor: '#8896B3',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.azulOscuro,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: colors.blanco,
    fontSize: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blanco,
  },
  placeholder: {
    width: 20,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blanco,
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.blanco,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: colors.azulOscuro,
  },
  optionArrow: {
    fontSize: 20,
    color: colors.azulClaro,
  },
  editButton: {
    backgroundColor: colors.azulClaro,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  editButtonText: {
    color: colors.blanco,
    fontSize: 14,
  },
  toggleContainer: {
    width: 50,
    height: 28,
    backgroundColor: '#E0E0E0',
    borderRadius: 14,
    padding: 3,
  },
  toggleButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.azulClaro,
  },
  logoutButton: {
    backgroundColor: colors.azulOscuro,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    backgroundColor: colors.rojo,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
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

export default AccountScreen;