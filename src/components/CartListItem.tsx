import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState } from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '../types';
import { Link } from 'expo-router';
import { defaultPizzaImg } from './ProductListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useCartContext } from '../providers/CartProvider';

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { addQuantity, subtractQuantity } = useCartContext();
  const [ qty, setQty ] = useState(cartItem.quantity)
  const [ isClear, setIsClear ] = useState(false)

  return (
    <>
    {cartItem.quantity > 0 ? 
    <View style={styles.container}>
        <Image
            source={{ uri: cartItem.product.image || defaultPizzaImg }}
            style={styles.image}
            resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>{cartItem.product.name}</Text>
            <View style={styles.subtitleContainer}>
            <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
            <Text>Size: {cartItem.size}</Text>
            </View>
        </View>
        <View style={styles.quantitySelector}>
            <FontAwesome
            onPress={() => {
                subtractQuantity(cartItem)
                if(qty > 1)
                    setQty((prev) => prev-1)
                else
                    setIsClear(true)
                }}
            name="minus"
            color="gray"
            style={{ padding: 5 }}
            />
            <Text style={styles.quantity}>{cartItem.quantity}</Text>
            <FontAwesome
            onPress={() => {          
                addQuantity(cartItem)
                setQty((prev) => prev+1)
                }
            }
            name="plus"
            color="gray"
            style={{ padding: 5 }}
            />
        </View>
    </View>
    : <Text></Text>}</>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default CartListItem;