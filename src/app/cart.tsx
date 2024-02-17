import { View, Text, Platform, FlatList, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'

const CartScreen = () => {
    const { items, totalPrice } = useCartContext()

  return (
    <View style={styles.container}>
        {/* {items.map((item) => <Text>{item.quantity}</Text> )} */}
        {/* <Text>{items[0].quantity}</Text> */}
      <FlatList 
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />} 
        numColumns={1}
        contentContainerStyle={{ gap: 10 }}
        // columnWrapperStyle={{ gap: 10 }}
      />
      <Text style={styles.price}>Total Price: ₱ {totalPrice.toFixed(2)}</Text>
      <Button text="Checkout"/> 
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: 20
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 'auto',
    },
})

export default CartScreen