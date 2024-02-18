import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImg } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/data/products'

const CreateProduct = () => {

  const [name, setName ] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [product, setProduct] = useState({})
  const { id } = useLocalSearchParams()
  const isUpdating = !!id

  function createProduct() {
    if(validateInput()) {
      resetFields()
      console.warn("Created the product.")
    }
    else 
      return
  }

  function updateProduct() {
    if(validateInput()) {
      resetFields()
      console.warn("Updated the product.")
    }
    else 
      return
  }

  function onDeletePress() {
    Alert.alert('Confirm', 'Are you sure you want to delete this product', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: deleteProduct,
      },
      {
        text: 'Cancel',
      },
      
    ]);
  }

  function deleteProduct() {
    console.warn("Deleted the product.")
  }

  function onSubmit() {
    if(!isUpdating)
      createProduct()
    else
      updateProduct()
  }

  function resetFields() {
    setName('')
    setPrice('')
  }

  function validateInput() {
    setError('')
    if(!name) {
      setError("Name is required")
      return false
    }
    if(!price) {
      setError("Price is required")
      return false
    }
    if(isNaN(parseFloat(price))) {
      setError("Price is not a number")
      return false
    }
    return true    
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
      />
      <Image source={{uri: image || defaultPizzaImg}} style={styles.image}/>
      <Text style={styles.selectImageText} onPress={pickImage}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder='Cheese Pizza'
        style={styles.input}
      />
      <Text style={styles.label}>Price (₱)</Text>
      <TextInput 
        value={price}
        onChangeText={setPrice}
        placeholder='10.99'
        style={styles.input}
        keyboardType='numeric'
      />
      <Text style={{color: 'red'}}>{error}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update': 'Create'}/>
      {isUpdating && <Text style={styles.deleteText} onPress={onDeletePress}>Delete Product</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 10
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20
  },
  label: {
    color: 'gray',
    fontSize: 16
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  selectImageText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  },
  deleteText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10
  }
})

export default CreateProduct