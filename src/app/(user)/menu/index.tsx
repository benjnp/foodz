import { View, FlatList, ScrollView } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
  return (
    // <ScrollView>
    <View>
      <FlatList 
        data={products}
        renderItem={({item}) => <ProductListItem productItem={item} />} 
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      {/* <ProductListItem productItem={products[0]}/> */}
      {/* <ProductListItem productItem={products[1]}/> */}
    </View>
    // </ScrollView>
  )
}
