import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants';

import { Feather } from '@expo/vector-icons'

interface ItemProps {
  data: {
      id: string;
      product_id: string;
      name: string;
      amount: string | number;
  }
  deleteItem: (Item_id: string) => void;
}

export function ListItem({data, deleteItem}: ItemProps) {
  function handleDeleteItem(){
    deleteItem(data.id)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.item} >{data.amount} - {data?.name}</Text>
      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" color={COLORS.red900} size={25} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Dark900,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: COLORS.gray100
  },
  item: {
    color: COLORS.white
  }
})