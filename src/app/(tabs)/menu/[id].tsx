import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImg } from '@/src/components/ProductListItem';
import { useState } from 'react'
import Button from '@/src/components/Button';

const productItem = () => {
  const { id } = useLocalSearchParams()
  const [ selectedSize, setSelectedSize ] = useState('L')

  const product = products.find((p) => p.id.toString() === id)
  // console.log("PRoduct: ", id)

  function addToCart() {
    console.warn("Add to cart: ", selectedSize)
  }
  
  return (
    <View style={styles.container}>
      {product && (
        <View style={styles.container}>
          <Stack.Screen options={{title: product.name}}/>
          <Image source={{uri: product.image || defaultPizzaImg}} style={styles.productImage}/>
          <Text style={styles.selectSizeText}>Select Size</Text>
          <View style={styles.sizes}>
            {product.sizes.map((size, index) => 
              <Pressable 
                style={[styles.sizeContainer, {backgroundColor: size == selectedSize ? 'gainsboro' : 'white'}]}
                onPress={() => setSelectedSize(size)}
              >
                <Text key={index} style={[styles.size,{color: size == selectedSize ? 'black' : 'gray'}]}>{size}</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.price}>₱{product.price}</Text>
          <Button onPress={addToCart} text="Add to Checkout"/> 
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
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