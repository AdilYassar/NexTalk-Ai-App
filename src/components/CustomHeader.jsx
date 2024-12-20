import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Bars2Icon, Bars3BottomLeftIcon, CheckBadgeIcon } from 'react-native-heroicons/solid'
import { RFValue } from 'react-native-responsive-fontsize'

import aiLogo from '../assets/aiLogo.jpeg'
import CustomText from './CustomText'
import { useDispatch } from 'react-redux'
import { clearAllChats, clearChat } from '../redux/reducers/chatSlice'
import SideDrawer from './SideDrawer'
const CustomHeader = ({
    currentChatId,
    chats,
    setCurrentChatId
}) => {
    const dispatch = useDispatch();
    const onClearChat = async()=>{
        dispatch(clearChat({chatId:currentChatId}));
    }

   const [visibile, setVisibile] = useState(false) 
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.subContainer}>
        <TouchableOpacity onPress={()=>setVisibile(true)}>
    <Bars3BottomLeftIcon size={RFValue(20)} color='#fff' />
        </TouchableOpacity>
        <View style={styles.flexRow}>
            <Image  source={aiLogo}  style={styles.image}   />
           <View>
           <CustomText fontWeight='bold' >
                NexTalk AI <CheckBadgeIcon  color='#27d366' size={14}  />
            </CustomText>
            <CustomText fontWeight={300} opacity={0.7} size={12} >
               With Llama 3
            </CustomText>
           </View>
        </View>
        <TouchableOpacity onPress={onClearChat}>
            <CustomText size={14}   >
                Clear
            </CustomText>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
      {visibile &&(
      <SideDrawer
      setCurrentChatId={(id)=>setCurrentChatId(id)}
      chats={chats}
      OnPressHide={()=>setVisibile(false)}
      visibile={visibile}
      currentChatId={currentChatId}
       />
       )}
    </View>
  )
}


const styles = StyleSheet.create({
    subContainer:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        gap:10,

    },
    image:{
        width:38,
        height:38,
        borderRadius:40
    },
    flexRow:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        gap:10
    },
    container:{
        padding:20,
        backgroundColor:'grey',
        borderBottomWidth:0.18,
        borderBottomColor:'rgba(62,62,63,1)',

    }
})

export default CustomHeader