import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert
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
  
  // Estados para los modales y formularios
  const [addToCartVisible, setAddToCartVisible] = useState(false);
  const [removeFromCartVisible, setRemoveFromCartVisible] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [inCart, setInCart] = useState(false);
  
  // Datos de productos
  const productsData: Product[] = [
    {
      id: 1,
      name: 'Automatización Inteligente',
      description: 'Sistema completo de automatización para controlar tus dispositivos de manera eficiente y segura. Compatible con todas las persianas de nuestra marca y muchos dispositivos de terceros.',
      price: 179.99,
      oldPrice: 199.99,
      image: require('../assets/product1.jpg'),
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
    },
    {
      id: 2,
      name: 'Monitoreo Remoto',
      description: 'Sistema avanzado para supervisar tu hogar o negocio desde cualquier parte del mundo. Acceso en tiempo real a datos de sensores y cámaras integradas.',
      price: 212.49,
      oldPrice: 249.99,
      image: require('../assets/product2.jpg'),
      category: 'Seguridad',
      rating: 4.6,
      reviewCount: 250,
      features: [
        'Monitoreo 24/7 desde cualquier lugar',
        'Alertas en tiempo real',
        'Histórico de eventos',
        'Compatible con múltiples cámaras',
        'Cifrado de extremo a extremo',
        'Almacenamiento en la nube'
      ],
      specifications: {
        'Dimensiones': '12 x 8 x 3 cm',
        'Peso': '200g',
        'Conectividad': 'WiFi, Ethernet',
        'Alimentación': '9V DC',
        'Consumo': '3.5W (máx)',
        'Compatibilidad': 'Android, iOS, Windows, macOS'
      }
    },
    {
      id: 3,
      name: 'Eficiencia Energética',
      description: 'Solución integral para optimizar el consumo de energía con tecnología IoT. Reduce hasta un 30% de tu factura eléctrica mensual.',
      price: 170.99,
      oldPrice: 179.99,
      image: require('../assets/product3.jpg'),
      category: 'Energía',
      rating: 4.7,
      reviewCount: 180,
      features: [
        'Análisis de consumo en tiempo real',
        'Apagado automático de dispositivos',
        'Optimización de climatización',
        'Configuración de modos de ahorro',
        'Reportes semanales de consumo',
        'Integración con paneles solares'
      ],
      specifications: {
        'Dimensiones': '8 x 8 x 2.5 cm',
        'Peso': '120g',
        'Conectividad': 'WiFi, Zigbee',
        'Alimentación': '3.3V DC',
        'Consumo': '1.2W (máx)',
        'Compatibilidad': 'Dispositivos inteligentes, electrodomésticos'
      }
    },
    {
      id: 4,
      name: 'Sensor de Movimiento Inteligente',
      description: 'Dispositivo de alta precisión que detecta movimientos con tecnología infrarroja y algoritmos avanzados para reducir falsas alarmas.',
      price: 89.99,
      oldPrice: undefined,
      image: require('../assets/product4.jpg'),
      category: 'Seguridad',
      rating: 4.5,
      reviewCount: 210,
      features: [
        'Detección de 360 grados',
        'Alcance de hasta 10 metros',
        'Filtrado de mascotas',
        'Notificaciones instantáneas',
        'Batería de larga duración',
        'Instalación sin cables'
      ],
      specifications: {
        'Dimensiones': '6 x 6 x 3 cm',
        'Peso': '80g',
        'Conectividad': 'WiFi, BLE',
        'Alimentación': 'Batería CR123A',
        'Duración batería': 'Hasta 12 meses',
        'Sensibilidad': 'Ajustable (3 niveles)'
      }
    },
    {
      id: 5,
      name: 'Control de Persianas Premium',
      description: 'El sistema más avanzado para el control automatizado de persianas y cortinas. Silencioso, preciso y con múltiples opciones de programación.',
      price: 299.99,
      oldPrice: 349.99,
      image: require('../assets/product5.jpg'),
      category: 'Persianas',
      rating: 4.9,
      reviewCount: 150,
      features: [
        'Motor silencioso (menos de 35dB)',
        'Control preciso de posición',
        'Programación por horarios o luz solar',
        'Detección de obstáculos',
        'Integración con escenas de hogar',
        'Compatible con múltiples tipos de persianas'
      ],
      specifications: {
        'Dimensiones': '25 x 5 x 5 cm',
        'Peso': '450g',
        'Conectividad': 'WiFi, Z-Wave',
        'Alimentación': '110-240V AC',
        'Potencia': '30W',
        'Carga máxima': 'Hasta 20kg'
      }
    },
    {
      id: 6,
      name: 'Kit de Inicio Hogar Inteligente',
      description: 'Conjunto completo con todos los dispositivos esenciales para comenzar a transformar tu casa en un hogar inteligente y conectado.',
      price: 399.99,
      oldPrice: 449.99,
      image: require('../assets/product6.jpg'),
      category: 'Domótica',
      rating: 4.7,
      reviewCount: 178,
      features: [
        'Hub central de control',
        '3 bombillas inteligentes',
        '2 sensores de movimiento',
        '1 sensor de puerta/ventana',
        '1 enchufe inteligente',
        'Aplicación de control centralizado'
      ],
      specifications: {
        'Contenido': '7 dispositivos + hub',
        'Conectividad': 'WiFi, Zigbee, Z-Wave',
        'Alimentación': 'Varía según dispositivo',
        'Espacio recomendado': 'Hasta 120m²',
        'Requisitos': 'Conexión a Internet',
        'Compatibilidad': 'Google Home, Alexa, HomeKit'
      }
    }
  ];

  // Encontrar el producto por su ID
  const product = productsData.find(p => p.id === productId);

  // Funciones para manejar el carrito
  const handleAddToCart = () => {
    setAddToCartVisible(false);
    const qty = parseInt(quantity) || 1;
    
    Alert.alert(
      "Producto añadido",
      `Se han añadido ${qty} unidades de ${product?.name} a tu carrito.`,
      [{ text: "OK", onPress: () => setInCart(true) }]
    );
  };

  const handleRemoveFromCart = () => {
    setRemoveFromCartVisible(false);
    
    Alert.alert(
      "Producto eliminado",
      `Se ha eliminado ${product?.name} de tu carrito.`,
      [{ text: "OK", onPress: () => setInCart(false) }]
    );
  };

  const handleShowCartOptions = () => {
    if (inCart) {
      setRemoveFromCartVisible(true);
    } else {
      setAddToCartVisible(true);
    }
  };

  // Si no se encuentra el producto, mostrar un mensaje de error
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalle del Producto</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
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
        <TouchableOpacity 
          style={[
            styles.addToCartButton, 
            inCart ? styles.removeFromCartButton : null
          ]}
          onPress={handleShowCartOptions}
        >
          <Text style={styles.addToCartButtonText}>
            {inCart ? "Modificar Carrito" : "Añadir al Carrito"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Añadir al Carrito */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addToCartVisible}
        onRequestClose={() => setAddToCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir al Carrito</Text>
            
            <View style={styles.modalProductInfo}>
              <Image 
                source={product.image} 
                style={styles.modalProductImage} 
                resizeMode="cover"
              />
              <View style={styles.modalProductDetails}>
                <Text style={styles.modalProductName}>{product.name}</Text>
                <Text style={styles.modalProductPrice}>${product.price}</Text>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Cantidad:</Text>
              <TextInput
                style={styles.formInput}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Notas especiales:</Text>
              <TextInput
                style={[styles.formInput, styles.formTextarea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Instrucciones especiales para este producto..."
                multiline={true}
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setAddToCartVisible(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={handleAddToCart}
              >
                <Text style={styles.modalButtonConfirmText}>Añadir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Eliminar del Carrito */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={removeFromCartVisible}
        onRequestClose={() => setRemoveFromCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Opciones del Carrito</Text>
            
            <View style={styles.modalProductInfo}>
              <Image 
                source={product.image} 
                style={styles.modalProductImage} 
                resizeMode="cover"
              />
              <View style={styles.modalProductDetails}>
                <Text style={styles.modalProductName}>{product.name}</Text>
                <Text style={styles.modalProductPrice}>${product.price}</Text>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Cantidad actual:</Text>
              <TextInput
                style={styles.formInput}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setRemoveFromCartVisible(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonDelete}
                onPress={handleRemoveFromCart}
              >
                <Text style={styles.modalButtonConfirmText}>Eliminar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={() => {
                  setRemoveFromCartVisible(false);
                  Alert.alert("Carrito actualizado", "La cantidad ha sido actualizada.");
                }}
              >
                <Text style={styles.modalButtonConfirmText}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  removeFromCartButton: {
    backgroundColor: colors.azulClaro,
  },
  addToCartButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.azulOscuro,
  },
  
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.blanco,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalProductInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 15,
  },
  modalProductImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  modalProductDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.azulOscuro,
    marginBottom: 5,
  },
  modalProductPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.azulMedio,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.azulMedio,
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  formTextarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButtonCancel: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: colors.azulMedio,
    fontWeight: '500',
  },
  modalButtonConfirm: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.azulMedio,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonDelete: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F44336',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalButtonConfirmText: {
    color: colors.blanco,
    fontWeight: '500',
  },
});

export default ProductDetailScreen;