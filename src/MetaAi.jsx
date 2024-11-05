import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WABG from './assets/w_bg.png';
import CustomHeader from './components/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentChatId, selectChats, selectCurrentChatId } from './redux/reducers/chatSlice';
import SendButton from './components/SendButton';
const MetaAi = () => {
  const dispatch = useDispatch()
  const chats = useSelector(selectChats);
  const currentChatId = useSelector(selectCurrentChatId);
  const[isTyping, setIsTyping] =useState(false);
  const[heightOfMessageBox, setHeightOffMessageBox] =useState(0);
  const setCurrentChatId=id=>{
    dispatch(changeCurrentChatId({chatId:id}));

  }
 
  console.log(JSON.stringify(chats));
  return (
    <ImageBackground source={WABG} style={styles.container} resizeMode='cover'>
   <CustomHeader />
   <SendButton
   isTyping={isTyping}
   setHeightOffMessageBox={setHeightOffMessageBox}
   heightOfMessageBox={heightOfMessageBox}
   setIsTyping={setIsTyping}
   
   currentChatId={currentChatId}
  setCurrentChatId={id=>setCurrentChatId(id)}
   length={chats?.find(chat=>chat.id==currentChatId)?.messages?.length  || [].lenght}
   messages={chats?.find(chat=>chat.id==currentChatId)?.messages  || []}
    />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
container:{
    flex:1,
}
})

export default MetaAi