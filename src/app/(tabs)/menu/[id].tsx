import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';


const productItem = () => {
  const {id} = useLocalSearchParams()
  return (
    <View>
      <Stack.Screen options={{title: 'Details: ' + id}}/>
      <Text>PRoduct Details for {id}</Text>
    </View>
  )
}

export default productItem