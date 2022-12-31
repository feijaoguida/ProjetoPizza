import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { COLORS, SIZES } from "../../constants";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

export default function Dashboard(){
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [ table, setTable ] = useState('');

  async function openOrder() {
    if (table === ''){
      return
    }

    const response = await api.post('/order', {
      table: Number(table)
    })
    navigation.navigate('Order', { table: table, order_id: response.data.id })

    setTable('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Numero da Mesa"
        placeholderTextColor={COLORS.white}
        keyboardType='numeric'
        value={table}
        onChangeText={setTable}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
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
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.red900,
    marginBottom: 24,

  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: COLORS.Dark900,
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: SIZES.h2,
    color: COLORS.white
  },
  button:{
    width: '90%',
    height: 40,
    backgroundColor: COLORS.green900,
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Dark900
  }
})