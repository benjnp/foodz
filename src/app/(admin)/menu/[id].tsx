import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImg } from '@/src/components/ProductListItem';
import { useState } from 'react'
import Button from '@/src/components/Button';
import { useCartContext } from '@/src/providers/CartProvider';
// import { PizzaSize } from '@/src/types';

const productItem = () => {
  const { id } = useLocalSearchParams()
  const [ selectedSize, setSelectedSize ] = useState('L')
  const { addItem } = useCartContext()
  const router = useRouter()

  const product = products.find((p) => p.id.toString() === id)

  const addToCart = () => {
    if (!product)
      return
    addItem(product, selectedSize)
    router.push('/cart')
  }
  
  return (
    <View style={styles.container}>
      {product && (
        <View style={styles.container}>
          <Stack.Screen options={{title: product.name}}/>
          <Image source={{uri: product.image || defaultPizzaImg}} style={styles.productImage}/>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₱{product.price}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  productImage: {
    width: '100%',
    aspectRatio: 1
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  selectSizeText: { 
    marginTop: 10,
    fontWeight: 'bold'
  },
  sizes: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around'
  },
  sizeContainer: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  size: {
    fontSize: 20,
    fontWeight: '500',
  },
  bottomSection: {
    display: 'flex',
    marginTop: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

export default productItem