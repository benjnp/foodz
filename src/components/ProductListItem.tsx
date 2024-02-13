import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';

export const defaultPizzaImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

type ProductItemProps = {
    productItem: Product
}

const ProductListItem = ({productItem}: ProductItemProps) => {
  return (
    <View style={styles.container}>
        <Image source={{uri: productItem.image || defaultPizzaImg}} style={styles.image}/>
        <Text style={styles.title}>{productItem.name}</Text>
        <Text style={styles.price}>₱{productItem.price}</Text>
    </View>
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