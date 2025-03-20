import React from 'react';
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
  Dimensions
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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
  Home: undefined;
  Products: undefined;
  ProductDetail: { productId: number };
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: any; // Utiliza require() para imágenes locales
  category: string;
  rating: number;
  reviewCount: number;
};

const ProductsScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      name: 'Automatización Inteligente',
      description: 'Controla tus dispositivos de manera eficiente y segura.',
      price: 179.99,
      oldPrice: 199.99,
      image: require('../assets/product1.jpg'), // Reemplaza con la ruta correcta
      category: 'Domótica',
      rating: 4.8,
      reviewCount: 320
    },
    {
      id: 2,
      name: 'Monitoreo Remoto',
      description: 'Supervisa tu hogar o negocio desde cualquier parte del mundo.',
      price: 212.49,
      oldPrice: 249.99,
      image: require('../assets/product2.jpg'), // Reemplaza con la ruta correcta
      category: 'Seguridad',
      rating: 4.6,
      reviewCount: 250
    },
    {
      id: 3,
      name: 'Eficiencia Energética',
      description: 'Optimiza el consumo de energía con tecnología IoT.',
      price: 170.99,
      oldPrice: 179.99,
      image: require('../assets/product3.jpg'), // Reemplaza con la ruta correcta
      category: 'Energía',
      rating: 4.7,
      reviewCount: 180
    },
    {
      id: 4,
      name: 'Sensor de Movimiento Inteligente',
      description: 'Detecta movimientos con precisión y seguridad.',
      price: 89.99,
      oldPrice: undefined,
      image: require('../assets/product4.jpg'), // Reemplaza con la ruta correcta
      category: 'Seguridad',
      rating: 4.5,
      reviewCount: 210
    },
    {
      id: 5,
      name: 'Control de Persianas Premium',
      description: 'El sistema más avanzado para el control de persianas.',
      price: 299.99,
      oldPrice: 349.99,
      image: require('../assets/product5.jpg'), // Reemplaza con la ruta correcta
      category: 'Persianas',
      rating: 4.9,
      reviewCount: 150
    },
    {
      id: 6,
      name: 'Kit de Inicio Hogar Inteligente',
      description: 'Todo lo que necesitas para comenzar con tu hogar inteligente.',
      price: 399.99,
      oldPrice: 449.99,
      image: require('../assets/product6.jpg'), // Reemplaza con la ruta correcta
      category: 'Domótica',
      rating: 4.7,
      reviewCount: 178
    },
  ]);

  // Función para renderizar cada producto en modo cuadrícula
  const renderGridItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.productCard}>
        <Image 
          source={item.image} 
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            {item.oldPrice && (
              <Text style={styles.oldPrice}>${item.oldPrice}</Text>
            )}
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
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image 
        source={item.image} 
        style={styles.listItemImage}
        resizeMode="cover"
      />
      <View style={styles.listItemInfo}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text style={styles.listItemDescription} numberOfLines={1}>{item.description}</Text>
        
        <View style={styles.listItemCategory}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.listItemPriceContainer}>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice}</Text>
          )}
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.viewButton}
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        <Text style={styles.viewButtonText}>Ver Más</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
        keyExtractor={(item) => item.id.toString()}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Forzar re-render cuando cambie el modo de vista
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
    shadowColor: "#000",
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
    shadowColor: "#000",
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