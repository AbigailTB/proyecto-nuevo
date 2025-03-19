import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Account: undefined;
  EditAccount: undefined;
};

type EditAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditAccount'>;

type Props = {
  navigation: EditAccountScreenNavigationProp;
};

const EditAccountScreen: React.FC<Props> = ({ navigation }) => {
  // Datos simulados del usuario para la edición
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@ejemplo.com');
  const [phone, setPhone] = useState('+52 55 1234 5678');
  const [address, setAddress] = useState('Calle Ejemplo #123, Col. Centro');

  const handleSave = () => {
    // Aquí normalmente se enviarían los datos al servidor
    // Simulamos una actualización exitosa
    Alert.alert(
      "Perfil Actualizado",
      "Tu información ha sido actualizada exitosamente.",
      [
        { text: "OK", onPress: () => navigation.navigate('Account') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Account')}
        >
          <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ingresa tu nombre completo"
            />
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
            />
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
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dirección</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Ingresa tu dirección"
              multiline
            />
          </View>
        </View>
        
        <View style={styles.profilePictureSection}>
          <Text style={styles.sectionTitle}>Foto de Perfil</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Cambiar Foto de Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  profilePictureSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default EditAccountScreen;