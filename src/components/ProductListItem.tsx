import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';

export const defaultPizzaImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductItemProps = {
    productItem: Product
}

const ProductListItem = ({productItem}: ProductItemProps) => {
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/menu/${productItem.id}`} asChild>
        <Pressable style={styles.container}>
            <Image source={{uri: productItem.image || defaultPizzaImg}} style={styles.image}/>
            <Text style={styles.title}>{productItem.name}</Text>
            <Text style={styles.price}>₱{productItem.price}</Text>
        </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
    resizeMode: 'contain'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  }, 
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    aspectRatio: 1
  }
});


export default ProductListItem