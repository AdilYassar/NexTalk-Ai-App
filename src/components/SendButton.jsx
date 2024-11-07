/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Dimensions, Platform, TextInput, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import useKeyboardOffsetHeight from '../helpers/useKeyboardOffsetHeight';
import { useDispatch, useSelector } from 'react-redux';
import {markMessageAsRead, updateChatSummary,addMessages, createNewChat, selectChats, selectCurrentChatId } from '../redux/reducers/chatSlice';
import { PaperAirplaneIcon } from 'react-native-heroicons/solid';
import uuid from 'react-native-uuid';

const windowHeight = Dimensions.get('window').height;

const SendButton = ({
    isTyping,
    setIsTyping,
    setCurrentChatId,
    length,
    setHeightOfMessageBox,
    messages,
}) => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const currentChatId = useSelector(selectCurrentChatId);
    const animationValue = useRef(new Animated.Value(0)).current;
    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const [message, setMessage] = useState('');
    const TextInputRef = useRef(null);
    const handleTextChange = (text) => {
        setIsTyping(!!text);
        setMessage(text);
    };

    const handleContentSizeChange = (event) => {
        setHeightOfMessageBox(event.nativeEvent.contentSize.height);
    };

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: isTyping ? 1 : 0,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, [isTyping, animationValue]);

    const sendButtonStyle = {
        opacity: animationValue,
        transform: [
            {
                scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                }),
            },
        ],
    };


const identifyImageApi = (prompt) =>{
    const imageRegex = /\b(generate\s*image|imagine)\b/i;
    if(imageRegex.test(prompt)){
        return true;
    }else{
        return false;
    }
}




    const addChat = async (newId) => {
        let selectedChatId = newId || currentChatId;
        if(length == 0 && message.trim().length>0){
             dispatch(updateChatSummary({
                chatId:selectedChatId,
                summary:message?.trim().slice(0,40)
            }))
        }
        
        
         dispatch(
            addMessages({
                chatId: selectedChatId,
                message: {
                    content: message,
                    time: new Date().toString(),
                    role: 'user', //  assistant
                    id: uuid.v4(), // Ensure unique ID for each message
                    isMessageRead: false,
                   
                    
                },
            })
        );
        setMessage('');
       // TextInputRef.current.blur();
        setIsTyping:{false};

let promptForAssistant={
    content:message,
    time:new Date().toString(),
    role:'user',
    id:length+1,
    isMessageRead:false

}

        if(!identifyImageApi(message)){
            fetchResponse(promptForAssistant, selectedChatId)
        }else{
            generateImage(promptForAssistant,selectedChatId)
        }

        dispatch(markMessageAsRead({
            chatId:selectedChatId,
            messageId: length +1
        }))
    };





const fetchResponse = async(mes, selectedChatId)=>{

}

const generateImage = async(mes, selectedChatId)=>{

}








    return (
        <View
            style={[
                styles.container,
                {
                    bottom: Platform.OS === 'android' ? windowHeight * 0.02 : Math.max(keyboardOffsetHeight, windowHeight * 0.02),
                },
            ]}
        >
            <View style={styles.subContainer}>
                <View style={[styles.inputContainer, { width: isTyping ? '87%' : '100%' }]}>
                    <TextInput
                        editable
                        multiline
                        ref={TextInputRef}
                        value={message}
                        style={styles.textinput}
                        placeholder="Message"
                        placeholderTextColor="#a0a0a0"
                        onChangeText={handleTextChange}
                       // onContentSizeChange={handleContentSizeChange} // Enable dynamic height adjustment
                    />
                </View>
                {isTyping && (
                    <Animated.View style={[styles.sendButtonWrapper, sendButtonStyle]}>
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={async () => {
                                const chatIndex = chats.findIndex((chat) => chat.id === currentChatId);
                                if (chatIndex === -1) {
                                    const newId = uuid.v4();
                                    setCurrentChatId(newId);
                                    await dispatch(
                                        createNewChat({
                                            chatId: newId,
                                            messages: [],
                                            summary: 'New Chat',
                                        })
                                    );
                                    await addChat(newId);
                                    return;
                                }
                                await addChat();
                            }}
                        >
                            <PaperAirplaneIcon color="#000" />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: windowHeight * 0.06,
        maxHeight: windowHeight * 0.4,
        paddingHorizontal: '1%',
        padding: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        width: '98%',
        alignContent: 'center',
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    inputContainer: {
        backgroundColor: '#232626',
        margin: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '1%',
        borderRadius: 20,
    },
    textinput: {
        width: '98%',
        padding: 10,
        marginHorizontal: '2%',
        fontSize: RFValue(13),
        color: '#fff',
    },
    sendButtonWrapper: {
        position: 'absolute',
        right: 0,
        bottom: 6,
        width: '11%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    sendButton: {
        backgroundColor: '#22c063',
        borderRadius: 42,
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SendButton;
