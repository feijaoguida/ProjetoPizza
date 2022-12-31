import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import { CategoryProps } from '../../pages/Order'

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps){
  function onPressItem ( item: CategoryProps){
    selectedItem(item)
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ))


  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content:{
    width: WIDTH - 40,
    height: HEIGHT / 2,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    borderRadius: 4
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: COLORS.gray100
  },
  item:{
    margin: 18,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    color: COLORS.Dark900
  }
})