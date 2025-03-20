import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  StatusBar
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

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

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: NavigationProp<RootStackParamList>;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: any;
  category: string;
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: {
    [key: string]: string;
  };
};

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  
  // Aquí deberías cargar los detalles del producto según el ID
  // Por ahora, usamos datos de ejemplo
  const product: Product = {
    id: productId,
    name: 'Automatización Inteligente',
    description: 'Sistema completo de automatización para controlar tus dispositivos de manera eficiente y segura. Compatible con todas las persianas de nuestra marca y muchos dispositivos de terceros.',
    price: 179.99,
    oldPrice: 199.99,
    image: require('../assets/product1.jpg'), // Reemplaza con la ruta correcta
    category: 'Domótica',
    rating: 4.8,
    reviewCount: 320,
    features: [
      'Control remoto mediante aplicación móvil',
      'Compatible con asistentes de voz',
      'Programación de horarios',
      'Detección de presencia',
      'Bajo consumo de energía',
      'Fácil instalación'
    ],
    specifications: {
      'Dimensiones': '10 x 5 x 2 cm',
      'Peso': '150g',
      'Conectividad': 'WiFi, Bluetooth',
      'Alimentación': '5V DC',
      'Consumo': '2W (máx)',
      'Compatibilidad': 'Android, iOS, Google Home, Alexa'
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
        <Text style={styles.headerTitle}>Detalle del Producto</Text>
        <TouchableOpacity>
          <Text style={styles.cartButton}>🛒</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image 
          source={product.image} 
          style={styles.productImage}
          resizeMode="cover"
        />
        
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reseñas)</Text>
          </View>
          
          <View style={styles.priceContainer}>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>${product.oldPrice}</Text>
            )}
            <Text style={styles.price}>${product.price}</Text>
          </View>
          
          <Text style={styles.categoryText}>{product.category}</Text>
          
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <Text style={styles.featuresTitle}>Características</Text>
          {product.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          
          <Text style={styles.specificationsTitle}>Especificaciones</Text>
          {Object.entries(product.specifications).map(([key, value], index) => (
            <View key={index} style={styles.specificationItem}>
              <Text style={styles.specificationKey}>{key}:</Text>
              <Text style={styles.specificationValue}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.wishlistButton}>
          <Text style={styles.wishlistButtonText}>♡ Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Añadir al Carrito</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  cartButton: {
    fontSize: 20,
    color: colors.azulOscuro,
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#FFA000',
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: 14,
    color: colors.azulClaro,
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.azulClaro,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.azulOscuro,
  },
  categoryText: {
    fontSize: 14,
    color: colors.azulMedio,
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.azulClaro,
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  featureBullet: {
    fontSize: 14,
    color: colors.azulMedio,
    marginRight: 5,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: colors.azulClaro,
    flex: 1,
  },
  specificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginTop: 20,
    marginBottom: 10,
  },
  specificationItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  specificationKey: {
    fontSize: 14,
    color: colors.azulMedio,
    fontWeight: '500',
    width: '40%',
  },
  specificationValue: {
    fontSize: 14,
    color: colors.azulClaro,
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.blanco,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  wishlistButton: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.azulPastel,
    borderRadius: 10,
  },
  wishlistButtonText: {
    color: colors.azulMedio,
    fontSize: 16,
    fontWeight: '500',
  },
  addToCartButton: {
    flex: 2,
    backgroundColor: colors.azulMedio,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addToCartButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductDetailScreen;