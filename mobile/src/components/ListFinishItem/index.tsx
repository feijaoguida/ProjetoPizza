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
}

export function ListFinishItem({data}: ItemProps) {


  return(
    <View style={styles.container}>
      <Text style={styles.item} >{data.amount} - {data?.name}</Text>
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
    marginBottom: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: COLORS.gray100
  },
  item: {
    color: COLORS.white
  }
})