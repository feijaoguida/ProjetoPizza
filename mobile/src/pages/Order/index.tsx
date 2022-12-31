import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES,  } from '../../constants'
import { api } from '../../services/api'
import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItem'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
  Order: {
    table: string | number;
    order_id: string;
  }
}
export type CategoryProps = {
  id: string;
  name: string;
}
export type ProductProps = {
  id: string;
  name: string;
}
type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<OrderRouteProps>();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  const [product, setProduct] = useState<ProductProps[] | []>([])
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState(false)

  const [amount, setAmount] = useState('1')
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    async function loadCategory(){
      const response = await api.get('/category')

      setCategory(response.data);
      setCategorySelected(response.data[0])
    }

    loadCategory();
  }, [])

  useEffect(() => {
    async function loadProducts(){
      const response = await api.get('/category/product', {
        params: {
          category_id: categorySelected?.id
        }
      })

      setProduct(response.data)
      setProductSelected(response.data[0])
    }

    loadProducts();

  },[categorySelected])

  async function handleCloseOrder() {
    try{
      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id
        }
      })
      navigation.goBack();
    }catch(error){
      console.log(error)
    }
  }
  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item)
  }
  function handleChangeProduct(item: ProductProps){
    setProductSelected(item)
  }
  async function handleDeleteItem(item_id: string){
    await api.delete('/order/remove', {
      params: {
        item_id: item_id
      }
    })

    const removedItem = items.filter(item => {
      return(item.id !== item_id)
    })

    setItems(removedItem)
  }
  async function handleAdd() {
    const response = await api.post('/order/add', {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount)
    })

    const data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount
    }

    setItems(oldArray => [...oldArray, data])
  }
  function handleFinishOrder() {
    navigation.navigate("FinishOrder", { number: route.params?.table, order_id: route.params?.order_id, items: items })
  }
  return(
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table} </Text>
        <TouchableOpacity onPress={handleCloseOrder} style={{opacity: items.length > 0 ? 0.3 : 1 }} disabled={items.length > 0}>
          <Feather name="trash-2" size={SIZES.h1} color={COLORS.red900} />
        </TouchableOpacity>
      </View>
      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: COLORS.white }} > {categorySelected?.name}</Text>
        </TouchableOpacity>
      )}
      {product.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
          <Text style={{ color: COLORS.white }} >{productSelected?.name} </Text>
        </TouchableOpacity>
      )}
      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center'}]}
          placeholderTextColor={COLORS.gray100}
          keyboardType='numeric'
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]} 
          disabled={items.length ===0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24}}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType='fade'
      >
        <ModalPicker 
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType='fade'
      >
        <ModalPicker 
          handleCloseModal={() => setModalProductVisible(false)}
          options={product}
          selectedItem={handleChangeProduct}
        />
      </Modal>


    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark700,
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%'
  },
  header:{
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: 14
  },
  input: {
    backgroundColor: COLORS.Dark900,
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: COLORS.white,
    fontSize: SIZES.body2
  },
  qtdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    color: COLORS.white
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd:{
    width: '20%',
    backgroundColor: COLORS.blue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    color: COLORS.Dark900,
    fontSize: SIZES.body3,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: COLORS.green900,
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})