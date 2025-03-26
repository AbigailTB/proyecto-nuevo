  import React, { useState } from 'react';
  import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    Switch,
    Linking,
    ScrollView
  } from 'react-native';
  import { colors } from '../styles';
  import { logoutUser } from '../database/db'; 
  import { StackNavigationProp } from '@react-navigation/stack';

  // Define el mismo tipo para mantener consistencia
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

  type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

  type Props = {
    navigation: SettingsScreenNavigationProp;
  };

  const SettingsScreen: React.FC<Props> = ({ navigation }) => {
    // Estado para los toggles
    const [protectInfo, setProtectInfo] = useState(true);
    const [weatherAlerts, setWeatherAlerts] = useState(true);
    const [reminders, setReminders] = useState(true);
    // Estado para controlar el modo de visualización
    const [simpleView, setSimpleView] = useState(false);
    // Estado para el modal de contacto
    const [showContactModal, setShowContactModal] = useState(false);

    const handleButtonPress = (action: string) => {
      switch (action) {
        case 'changeName':
          navigation.navigate('EditAccount'); 
          break;
        case 'addAccount':
          navigation.navigate('AddAccount');
          break;
        case 'deleteAccount':
          Alert.alert(
            'Eliminar Cuenta',
            '¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Eliminar', 
                style: 'destructive', 
                onPress: () => {
                  // Navegamos directamente a la pantalla de login
                  console.log('Cuenta eliminada');
                  navigation.navigate('Login');
                }
              }
            ]
          );
          break;
          case 'logout':
            logoutUser().then(() => {
              Alert.alert('Sesión cerrada', 'Has cerrado sesión');
              navigation.replace('Login'); // Usar replace para prevenir volver atrás
            }).catch(error => {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            });
            break;
        case 'helpCenter':
          Alert.alert(
            'Centro de Ayuda',
            'Aquí encontrarás respuestas a tus preguntas frecuentes',
            [
              { text: 'Cerrar', style: 'cancel' }
            ]
          );
          break;
          case 'contactUs':
            Alert.alert(
              'Contactar a JADA',
              'Puedes contactarnos a través de los siguientes medios:',
              [
                { text: 'Correo', onPress: () => Linking.openURL('mailto:contacto@jada.com') },
                { text: 'Instagram', onPress: () => Linking.openURL('https://instagram.com/jada_company') },
                { text: 'Facebook', onPress: () => Linking.openURL('https://facebook.com/jadacompany') },
                { text: 'Cerrar', style: 'cancel' }
              ]
            );
          break;
        case 'toggleView':
          setSimpleView(!simpleView);
          break;
      }
    };

    // Vista simplificada con solo botones grandes
    const renderSimpleView = () => (
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <TouchableOpacity 
            style={styles.simpleButton} 
            onPress={() => handleButtonPress('changeName')}
          >
            <Text style={styles.simpleButtonText}>Cambiar Nombre</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.simpleButton} 
            onPress={() => handleButtonPress('addAccount')}
          >
            <Text style={styles.simpleButtonText}>Añadir Cuenta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.simpleButton, styles.dangerButton]} 
            onPress={() => handleButtonPress('deleteAccount')}
          >
            <Text style={[styles.simpleButtonText, styles.dangerButtonText]}>Eliminar Cuenta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.simpleButton} 
            onPress={() => handleButtonPress('helpCenter')}
          >
            <Text style={styles.simpleButtonText}>Centro de Ayuda</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.simpleButton} 
            onPress={() => handleButtonPress('contactUs')}
          >
            <Text style={styles.simpleButtonText}>Contáctanos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.simpleLogoutButton} 
            onPress={() => handleButtonPress('logout')}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.viewToggleButton} 
            onPress={() => handleButtonPress('toggleView')}
          >
            <Text style={styles.viewToggleText}>Ver Modo Avanzado</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );

    // Vista detallada con todas las opciones
    const renderDetailedView = () => (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          {/* Sección de Cuenta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Nombre</Text>
              <TouchableOpacity 
                style={styles.optionButton} 
                onPress={() => handleButtonPress('changeName')}
              >
                <Text style={styles.optionButtonText}>Cambiar</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.actionRow} 
              onPress={() => handleButtonPress('addAccount')}
            >
              <Text style={styles.optionText}>Añadir Cuenta</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionRow} 
              onPress={() => handleButtonPress('deleteAccount')}
            >
              <Text style={[styles.optionText, styles.dangerText]}>Eliminar Cuenta</Text>
              <Text style={[styles.arrowIcon, styles.dangerText]}>›</Text>
            </TouchableOpacity>
          </View>
          
          {/* Sección de Privacidad */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacidad</Text>
            
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Proteger mi información</Text>
              <Switch
                trackColor={{ false: "#767577", true: colors.azulClaro }}
                thumbColor={protectInfo ? colors.azulMedio : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setProtectInfo}
                value={protectInfo}
              />
            </View>
          </View>
          
          {/* Sección de Notificaciones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notificaciones</Text>
            
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Alertas de clima</Text>
              <Switch
                trackColor={{ false: "#767577", true: colors.azulClaro }}
                thumbColor={weatherAlerts ? colors.azulMedio : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setWeatherAlerts}
                value={weatherAlerts}
              />
            </View>
            
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Recordatorios</Text>
              <Switch
                trackColor={{ false: "#767577", true: colors.azulClaro }}
                thumbColor={reminders ? colors.azulMedio : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setReminders}
                value={reminders}
              />
            </View>
          </View>
          
          {/* Sección de Ayuda */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ayuda</Text>
            
            <TouchableOpacity 
              style={styles.helpRow} 
              onPress={() => handleButtonPress('helpCenter')}
            >
              <Text style={styles.optionText}>Centro de ayuda</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.helpRow} 
              onPress={() => handleButtonPress('contactUs')}
            >
              <Text style={styles.optionText}>Contáctanos</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>
          
          {/* Botón de cerrar sesión */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => handleButtonPress('logout')}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
          
          {/* Botón para cambiar a vista simple */}
          <TouchableOpacity 
            style={styles.viewToggleButton} 
            onPress={() => handleButtonPress('toggleView')}
          >
            <Text style={styles.viewToggleText}>Ver Modo Simple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.azulPastel} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
        </View>
        
        <View style={styles.container}>
          {simpleView ? renderSimpleView() : renderDetailedView()}
        </View>
        
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
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.1)',
      backgroundColor: colors.azulPastel || '#e6edf2',
    },
    title: {
      fontSize: 24,
      color: colors.azulOscuro || '#172b4d',
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingBottom: 30, // Extra padding to ensure all content is visible
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 30, // Para asegurar que todo el contenido sea visible
    },
    section: {
      backgroundColor: colors.blanco || '#fff',
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.azulOscuro || '#172b4d',
      marginBottom: 12,
    },
    optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    helpRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    optionText: {
      fontSize: 16,
      color: '#333',
    },
    dangerText: {
      color: colors.rojo || '#e53935',
    },
    optionButton: {
      backgroundColor: colors.azulMedio || '#0277bd',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    optionButtonText: {
      color: colors.blanco || '#fff',
      fontWeight: '500',
    },
    arrowIcon: {
      fontSize: 24,
      color: colors.azulMedio || '#0277bd',
    },
    simpleButton: {
      backgroundColor: colors.azulMedio || '#0277bd',
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
      width: '100%',
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
    simpleButtonText: {
      color: colors.blanco || '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    simpleLogoutButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.azulMedio || '#0277bd',
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonGroup: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
    },
    button: {
      backgroundColor: colors.azulMedio || '#0277bd',
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
      color: colors.blanco || '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    dangerButton: {
      backgroundColor: colors.rojo || '#e53935',
    },
    dangerButtonText: {
      color: colors.blanco || '#fff',
    },
    logoutButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.azulMedio || '#0277bd',
      padding: 15,
      borderRadius: 10,
      width: '85%',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 15,
    },
    logoutButtonText: {
      color: colors.azulMedio || '#0277bd',
      fontSize: 16,
      fontWeight: '600',
    },
    viewToggleButton: {
      backgroundColor: 'transparent',
      padding: 15,
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    viewToggleText: {
      color: colors.azulMedio || '#0277bd',
      fontSize: 14,
      textDecorationLine: 'underline',
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

  export default SettingsScreen;