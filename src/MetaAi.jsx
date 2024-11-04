import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import WABG from './assets/w_bg.png';
import CustomHeader from './components/CustomHeader';
const MetaAi = () => {
  return (
    <ImageBackground source={WABG} style={styles.container} resizeMode='cover'>
   <CustomHeader />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
container:{
    flex:1,
}
})

export default MetaAi