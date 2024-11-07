/* eslint-disable no-undef */
import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import useKeyboardOffsetHeight from '../helpers/useKeyboardOffsetHeight';
import getMessageHeightOffset from '../helpers/getMessageHeightOffsetHeight';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from './MessageBubble';
import EmptyComponent from './EmptyComponent';

const windowHeight = Dimensions.get('window').height;

const Chat = ({ isTyping, messages, heightOfMessageBox }) => {
    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const renderMessageBubble = ({ item }) => {
        return <MessageBubble message={item} />;
    };

    // Calculate chat list height with padding for better layout
    const calculatedHeight = windowHeight * 0.76 * keyboardOffsetHeight - 0.95 - getMessageHeightOffset(heightOfMessageBox || 0, windowHeight);
    const listHeight = calculatedHeight > 0 ? calculatedHeight : windowHeight * 0.6;

    return (
        <View style={{ height: listHeight, flex: 1 }}>
           {messages?.length === 0 ? (
                <EmptyComponent isTyping={isTyping} /> // Now isTyping is defined
            ) :  (
            <FlashList 
              indicatorStyle="black" 
              data={[...messages].reverse()}
              inverted
              estimatedItemSize={40}
              renderItem={renderMessageBubble}
              contentContainerStyle={{ paddingTop: 20 }} // Add top padding to start messages lower
            />
          )}
        </View>
    );
};

export default Chat;
