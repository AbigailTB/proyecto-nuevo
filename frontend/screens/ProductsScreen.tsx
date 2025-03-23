import React, { useEffect, useState } from 'react';
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
  ProductDetail: { productId: string }; // Cambia a string para _id
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
};

const ProductsScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener productos del backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para renderizar cada producto en modo cuadrícula
  const renderGridItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
    >
      <View style={styles.productCard}>
        <Image
          source={{ uri: item.image }} // Usa uri para imágenes desde URL
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.category || 'Sin categoría'}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {item.rating || 'N/A'}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount || 0})</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewButton}>
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
        source={{ uri: item.image }}
        style={styles.listItemImage}
        resizeMode="cover"
      />
      <View style={styles.listItemInfo}>
        <Text style={styles.listItemName}>{item.name}</Text>
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
          <Text style={styles.price}>${item.price}</Text>
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando productos...</Text>
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

      {/* Product Count */}
      <Text style={styles.productCount}>
        Mostrando {products.length} productos
      </Text>

      {/* Products Grid/List */}
      <FlatList
        data={products}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        keyExtractor={(item) => item._id}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
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