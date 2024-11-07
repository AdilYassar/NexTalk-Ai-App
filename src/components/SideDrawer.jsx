/* eslint-disable no-undef */
import { View, Text, StyleSheet, SafeAreaView, Image, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import CustomText from './CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { createNewChat,clearAllChats, deleteChat } from '../redux/reducers/chatSlice'
import { TrashIcon } from 'react-native-heroicons/solid'
import { useDispatch } from 'react-redux'
import uuid from 'react-native-uuid'
const SideDrawer = ({
    setCurrentChatId,chats,OnPressHide,visibile,currentChatId
}) => {


    const dispatch = useDispatch()
  
    const clearAllChatsHandler = async () => {
        dispatch(clearAllChats());
    };

    const deleteAChat = async (id) => {
        dispatch(deleteChat({ chatId: id }));
    };

    const addNewChat = async () => {
        dispatch(createNewChat({
            chatId: uuid.v4(),
            messages: [],
            summary: 'New chat'
        }));
    };




    const renderChats=({item})=>{
        return(
            <TouchableOpacity onPress={()=>{
                setCurrentChatId(item.id);
                OnPressHide();
            }}
            style={[
                styles.chatButon,{
                   backgroundColor:currentChatId==item.id ?'#041e49':'#131314',

                }
            ]}
            >
                <CustomText numberOfLines={1} style={{width:'70%'}} size={RFValue(11)} fontWeight='500'>
                    {item.summary}
                </CustomText>
                <TouchableOpacity onPress={()=>{
                    deleteAChat(item.id);
                }} style={styles.trashicons}>
<TrashIcon color='#ef4444' size={RFValue(12)} style={styles.trashicons}  />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }


  return (
    <Modal
    backdropColor='black'
    backdropOpacity={0.5}
    onBackdropPress={OnPressHide}
    onBackButtonPress={OnPressHide}
    animationIn='slideInLeft'
    animationOut='slideOutLeft'
     style={styles.bottomModalView} isVisible={visibile}>
    <SafeAreaView>
     <View style ={styles.modalContainer} >
        <View
        style={{
            height:'100%',
            width:'100%'
        }}>

        <View style = {styles.header}>
        <View style={styles.flexRow}>
        <Image 
         style={{height:30,width:30}}
         source={require('../assets/ai2.png')}
        />
        <CustomText size={RFValue(16)} opacity={0.8} fontWeight='600'>
            All Chats
        </CustomText>
        </View>

        <TouchableOpacity onPress={OnPressHide}>
         <XCircleIcon color='#ccc' size={RFValue(16)} />   
        </TouchableOpacity>

        </View>
      <TouchableOpacity style={styles.newChat} onPress={addNewChat}>
        <CustomText size={RFValue(10)}>
            Add New Chat
        </CustomText>
      </TouchableOpacity>
      <CustomText style={{margin:10, fontsize:RFValue(12)}}>
        Recent Chats
      </CustomText>

        <View style={{height:'60%'}}>
        
        <FlatList
        data={[...chats].reverse()}
        renderItem={renderChats}
        key={(item)=>item.id}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={{
            paddingHorizontal:5,
            paddingVertical:5
        }}
         />

          </View>
            <TouchableOpacity style={styles.clearAllChat} onPress={clearAllChatsHandler}>
              <CustomText fontWeight='500' size={RFValue(10)}>
                Clear All Chats
              </CustomText> 
            </TouchableOpacity>

        </View>

     </View>
     </SafeAreaView>
    </Modal>
  )
}
const styles = StyleSheet.create({
    bottomModalView:{
        justifyContent:'flex-end',
        width:'70%',
        margin:10

    },
    modalContainer:{
        backgroundColor:'#171717',
        borderRadius:20,
        overflow:'hidden',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }, flexRow:{
        gap:5,
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        padding:20,
        borderBottomWidth:1,
        flexDirection:'row',
        alignContent: 'space-between',
        alignItems:'center',
        borderColor:'grey'
    },
    newChat:{
        backgroundColor:'#27282c',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        width:'60%',
        margin:10,
        alignSelf:'center'
    
    },
clearAllChat:{
    backgroundColor:'#ef5432',
    padding:10,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    margin:20

}, trashicons:{
    padding:5,
    backgroundColor:'white',
    borderRadius:20
}, chatButon:{
    paddingHorizontal:12,
    paddingVertical:5,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:0
}
})

export default SideDrawer