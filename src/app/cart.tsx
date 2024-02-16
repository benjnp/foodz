import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '../providers/CartProvider'
import CartListItem from '../components/CartListItem'

const CartScreen = () => {
    const {items} = useCartContext()

  return (
    <View>
      <FlatList 
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />} 
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        // columnWrapperStyle={{ gap: 10 }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen