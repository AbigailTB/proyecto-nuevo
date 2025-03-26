import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import client from '../database/api/client';

// Colores basados en la paleta proporcionada
const colors = {
  azulOscuro: '#001B2A',
  azulMedio: '#1B263B',
  azulClaro: '#415A77',
  azulPastel: '#778DA9',
  blanco: '#E0E1DD',
  negro: '#000000',
};

// Definimos los tipos de las rutas de navegación
export type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  AddProduct: undefined;
  ProductDetail: { productId: string };
};

// Definimos el tipo de las props usando NativeStackNavigationProp
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Definimos el tipo Product alineado con el esquema de MongoDB
type Product = {
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  discount: number;
  features: string[];
  warranty: string;
  availability: string;
  specs: Record<string, string>; // Definimos specs como un objeto con claves y valores de tipo string
};

const AddProductScreen: React.FC<Props> = ({ navigation }) => {
  const [product, setProduct] = useState<Product>({
    image: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    rating: 0,
    reviews: 0,
    discount: 0,
    features: [],
    warranty: '',
    availability: '',
    specs: {}, // Inicializamos como objeto vacío
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const BASE_URL = 'http://localhost:5000'; // Ajusta según tu backend

  // Manejar cambios en los inputs
  const handleChange = (name: keyof Product, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'rating' || name === 'reviews' || name === 'discount'
          ? Number(value) || 0
          : name === 'features'
          ? value.split(',').map((item) => item.trim())
          : value,
    }));
  };

  // Enviar formulario
  const handleSubmit = async () => {
    // Validación básica
    if (!product.title || !product.description || !product.price || !product.category || !product.image) {
      setError('Por favor, completa los campos obligatorios (Título, Descripción, Precio, Categoría, URL de Imagen).');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await client.post('/api/products', product); // Ajusta la ruta según tu API
      setSuccess('Producto agregado exitosamente!');
      setProduct({
        image: '',
        title: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        rating: 0,
        reviews: 0,
        discount: 0,
        features: [],
        warranty: '',
        availability: '',
        specs: {},
      });
      // Redirigir a la pantalla de productos después de agregar
      setTimeout(() => navigation.navigate('Products'), 1500);
    } catch (err) {
      console.error('Error al agregar producto:', err);
      setError('No se pudo agregar el producto. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar Nuevo Producto</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Completa los detalles para agregar un nuevo producto a la tienda.
      </Text>

      {/* Mensajes */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{success}</Text>
        </View>
      )}

      {/* Formulario */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>URL de la Imagen *</Text>
          <TextInput
            style={styles.input}
            value={product.image}
            onChangeText={(text) => handleChange('image', text)}
            placeholder="https://example.com/image.jpg"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={product.title}
            onChangeText={(text) => handleChange('title', text)}
            placeholder="Ej: Cámara de Seguridad 4K"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={product.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Ej: Vigila tu hogar con una resolución ultra..."
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Precio *</Text>
          <TextInput
            style={styles.input}
            value={product.price.toString()}
            onChangeText={(text) => handleChange('price', text)}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Categoría *</Text>
          <TextInput
            style={styles.input}
            value={product.category}
            onChangeText={(text) => handleChange('category', text)}
            placeholder="Ej: Seguridad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            value={product.brand}
            onChangeText={(text) => handleChange('brand', text)}
            placeholder="Ej: SafeHome"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Rating (0-5)</Text>
          <TextInput
            style={styles.input}
            value={product.rating.toString()}
            onChangeText={(text) => handleChange('rating', text)}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de Reseñas</Text>
          <TextInput
            style={styles.input}
            value={product.reviews.toString()}
            onChangeText={(text) => handleChange('reviews', text)}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descuento (%)</Text>
          <TextInput
            style={styles.input}
            value={product.discount.toString()}
            onChangeText={(text) => handleChange('discount', text)}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Características (separadas por comas)</Text>
          <TextInput
            style={styles.input}
            value={product.features.join(', ')}
            onChangeText={(text) => handleChange('features', text)}
            placeholder="Ej: 4K, Visión nocturna, Detección de movimiento"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Garantía</Text>
          <TextInput
            style={styles.input}
            value={product.warranty}
            onChangeText={(text) => handleChange('warranty', text)}
            placeholder="Ej: 1 año"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Disponibilidad</Text>
          <TextInput
            style={styles.input}
            value={product.availability}
            onChangeText={(text) => handleChange('availability', text)}
            placeholder="Ej: En stock"
          />
        </View>

        {/* Botón de enviar */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.blanco} />
          ) : (
            <Text style={styles.submitButtonText}>Agregar Producto</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    fontSize: 24,
    color: colors.azulOscuro,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  subtitle: {
    fontSize: 14,
    color: colors.azulClaro,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  errorContainer: {
    padding: 15,
    backgroundColor: '#FFE6E6',
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
  },
  successContainer: {
    padding: 15,
    backgroundColor: '#E6FFE6',
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  successText: {
    color: '#2E7D32',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.azulOscuro,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.blanco,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: colors.azulMedio,
    borderWidth: 1,
    borderColor: colors.azulPastel,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.azulMedio,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: colors.azulClaro,
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;