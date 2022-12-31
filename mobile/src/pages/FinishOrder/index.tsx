import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import { COLORS, images, SIZES } from "../../constants";
import { ListFinishItem } from "../../components/ListFinishItem";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
  FinishOrder: {
    number: number | string;
    order_id: string;
    items: ItemProps[];
  }
}

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){
  const route = useRoute<FinishOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function handleFinish(){
    try {
      await api.put('/order/send', {
        order_id: route.params?.order_id
      })
      navigation.popToTop();
    } catch (error) {
      console.log("Erro ao Finiliar, Tente mais tarde")
    }
  }

  return(
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={images.logo}
      />
      <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
      <Text style={styles.title}>Mesa {route.params?.number}</Text>

      <FlatList 
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 24}}
        data={route.params?.items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ListFinishItem data={item}/>}
      />

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finalizar Pedido</Text>
        <Feather size={20} color={COLORS.Dark900} name="shopping-cart" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: COLORS.dark700

  },
  logo: {
    marginBottom: 18
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 24,

  },
  alert:{
    fontSize: SIZES.body2,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 12
  },
  button: {
    width: '65%',
    height: 40,
    backgroundColor: COLORS.green900,
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  textButton:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Dark900
  }
})