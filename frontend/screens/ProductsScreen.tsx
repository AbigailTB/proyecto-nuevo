import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Image, 
  TextInput, 
  StatusBar, 
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import client from '../database/api/client'; // Importa el cliente HTTP

const { width } = Dimensions.get('window');

// Colores basados en la paleta proporcionada
const colors = {
  azulOscuro: '#001B2A',
  azulMedio: '#1B263B',
  azulClaro: '#415A77',
  azulPastel: '#778DA9',
  blanco: '#E0E1DD',
  negro: '#000000',
};

type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  ProductDetail: { productId: string }; // Usando string para _id
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

type Product = {
  _id: string;
  name: string;
  title?: string; // Mantenemos título como opcional
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: number; // Mantenemos reviews como opción para compatibilidad
  discount?: number; // Incluimos descuento para mostrar precios tachados
};

const ProductsScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // URL base para imágenes y API
  const BASE_URL = 'http://localhost:5000';

  // Obtener productos del backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Intenta obtener datos usando el cliente HTTP
      try {
        const data = await client.get('/api/products');
        setProducts(data);
      } catch (clientError) {
        console.error('Error al obtener productos con client:', clientError);
        
        // Si falla, intenta obtener con fetch directo
        console.log('Fetching products from', `${BASE_URL}/productos`);
        const response = await fetch(`${BASE_URL}/productos`);
        
        if (!response.ok) {
          throw new Error(`Error de servidor: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        // Verificar la estructura de datos
        let productsList = [];
        
        if (jsonData && jsonData.data && Array.isArray(jsonData.data)) {
          productsList = jsonData.data;
        } else if (jsonData && Array.isArray(jsonData)) {
          productsList = jsonData;
        } else {
          throw new Error('Formato de datos inesperado');
        }
        
        setProducts(productsList);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setError('No se pudieron cargar los productos. Inténtalo de nuevo.');
      
      // Cargar datos de muestra para hacer pruebas de UI
      setProducts([
        {
          _id: '1',
          title: 'Persiana Inteligente',
          name: 'Persiana Inteligente',
          description: 'Control automático de persianas para tu hogar inteligente',
          price: 179.99,
          image: 'https://via.placeholder.com/300x200',
          category: 'Domótica',
          rating: 4.5,
          reviewCount: 120
        },
        {
          _id: '2',
          title: 'Control Remoto Avanzado',
          name: 'Control Remoto Avanzado',
          description: 'Control remoto para todos tus dispositivos del hogar',
          price: 59.99,
          image: 'https://via.placeholder.com/300x200',
          category: 'Accesorios',
          rating: 4.2,
          reviewCount: 85
        },
        {
          _id: '3',
          title: 'Sensor de Luz',
          name: 'Sensor de Luz',
          description: 'Detecta niveles de luz para automatizar tus persianas',
          price: 34.99,
          image: 'https://via.placeholder.com/300x200',
          category: 'Sensores',
          rating: 4.7,
          reviewCount: 63
        }
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para refrescar los datos
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  // Búsqueda de productos
  const filteredProducts = products.filter(product => {
    const name = product.title || product.name || '';
    const description = product.description || '';
    const category = product.category || '';
    
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Procesamiento de URL de imágenes
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return 'https://via.placeholder.com/300x200';
    
    // Si ya es una URL completa
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // Si es ruta relativa asegúrate de que comience con /
    const fixedPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    
    // Retorna la URL completa
    return `${BASE_URL}${fixedPath}`;
  };

  // Función para renderizar cada producto en modo cuadrícula
  const renderGridItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
    >
      <View style={styles.productCard}>
        <Image
          source={{ uri: getImageUrl(item.image) }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.title || item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.category || 'Sin categoría'}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {item.rating || 'N/A'}</Text>
              <Text style={styles.reviewCount}>({item.reviews || item.reviewCount || 0})</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            {item.discount && item.discount > 0 && (
              <Text style={styles.oldPrice}>
                ${(item.price / (1 - item.discount / 100)).toFixed(2)}
              </Text>
            )}
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
        >
          <Text style={styles.viewButtonText}>Ver Más</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Función para renderizar cada producto en modo lista
  const renderListItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
    >
      <Image
        source={{ uri: getImageUrl(item.image) }}
        style={styles.listItemImage}
        resizeMode="cover"
      />
      <View style={styles.listItemInfo}>
        <Text style={styles.listItemName}>{item.title || item.name}</Text>
        <Text style={styles.listItemDescription} numberOfLines={1}>
          {item.description}
        </Text>

        <View style={styles.listItemCategory}>
          <Text style={styles.categoryText}>{item.category || 'Sin categoría'}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.listItemPriceContainer}>
          {item.discount && item.discount > 0 && (
            <Text style={styles.oldPrice}>
              ${(item.price / (1 - item.discount / 100)).toFixed(2)}
            </Text>
          )}
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
      >
        <Text style={styles.viewButtonText}>Ver Más</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Renderizado de pantalla de carga
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.azulClaro} />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blanco} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuestros Productos</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Encuentra las mejores soluciones para el control de luz y privacidad en tu hogar u oficina.
      </Text>

      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewModeButton}
          onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          <Text style={styles.viewModeText}>
            {viewMode === 'grid' ? '≡' : '⊞'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Product Count */}
      <Text style={styles.productCount}>
        Mostrando {filteredProducts.length} productos
      </Text>

      {/* Products Grid/List */}
      <FlatList
        data={filteredProducts}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Forzar re-render cuando cambie el modo de vista
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No se encontraron productos
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
              <Text style={styles.retryButtonText}>Recargar</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.azulOscuro,
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
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: colors.azulClaro,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: colors.blanco,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.azulOscuro,
    marginBottom: 15,
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: colors.blanco,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.azulMedio,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.azulClaro,
  },
  filterButton: {
    backgroundColor: colors.blanco,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonText: {
    color: colors.azulMedio,
    fontSize: 14,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.azulMedio,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModeText: {
    color: colors.blanco,
    fontSize: 20,
  },
  productCount: {
    fontSize: 14,
    color: colors.azulClaro,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    minHeight: 100,
  },
  gridItem: {
    width: '50%',
    padding: 10,
  },
  productCard: {
    backgroundColor: colors.blanco,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: colors.azulClaro,
    marginBottom: 8,
    height: 32,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: colors.azulMedio,
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#FFA000',
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: 10,
    color: colors.azulClaro,
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: 12,
    color: colors.azulClaro,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  viewButton: {
    backgroundColor: colors.azulPastel,
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  viewButtonText: {
    color: colors.azulOscuro,
    fontSize: 14,
    fontWeight: '500',
  },
  listItem: {
    backgroundColor: colors.blanco,
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 2,
    overflow: 'hidden',
  },
  listItemImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  listItemInfo: {
    padding: 15,
  },
  listItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 5,
  },
  listItemDescription: {
    fontSize: 14,
    color: colors.azulClaro,
    marginBottom: 8,
  },
  listItemCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductsScreen;