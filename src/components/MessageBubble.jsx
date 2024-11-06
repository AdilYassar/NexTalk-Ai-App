import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import dayjs from 'dayjs';
import TickIcon from '../assets/tick.png';
import MarkdownDisplay from 'react-native-markdown-display';
import LoadingDots from './LoadingDots';

const MessageBubble = ({ message }) => {
  const isMyMessage = message.role === 'user';
  const isMessageRead = message?.isMessageRead;

  return (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
          backgroundColor: isMyMessage ? '#154d37' : '#232626',
          borderTopLeftRadius: isMyMessage ? 15 : 0,
          borderTopRightRadius: isMyMessage ? 0 : 15,
        },
      ]}
    >
      {isMyMessage && <View style={styles.rightMessageArrow} />}
      {!isMyMessage && <View style={styles.leftMessageArrow} />}
      
      {/* Conditional rendering for loading state */}
      {message.isLoading ? (
        <LoadingDots />
      ) : (
        <MarkdownDisplay
          style={{
            body: {
              ...styles.messageText,
              left: isMyMessage ? 10 : 0,
              marginVertical: 0,
              paddingVertical: 0,
            },
            link: {
              color: 'lightblue',
            },
            blockquote: {
              color: 'white',
              backgroundColor: '#1d211e',
              borderRadius: 4,
            },
            table: {
              borderColor: 'white',
            },
            code_inline: {
              backgroundColor: '#1d211e',
              color: 'white',
              borderRadius: 5,
              fence: {
                backgroundColor: '#1d211e',
                color: 'white',
                borderRadius: 5,
                borderWidth: 0,
              },
              tr: {
                borderColor: 'white',
              },
            },
          }}
        >
          {message.content}
        </MarkdownDisplay>
      )}

      <View style={styles.timeAndReadContainer}>
        <Text style={styles.timeText}>{dayjs(message.time).format('HH:mm A')}</Text>
        {isMyMessage && (
          <Image
            source={TickIcon}
            tintColor={isMessageRead ? '#53a6fd' : '#8aa69b'}
            style={styles.tickIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    paddingVertical: 8, // Adjusted for better readability
    paddingHorizontal: 12,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'column', // Keeps text and time below each other
  },
  messageText: {
    fontSize: RFValue(12),
    color: 'white',
    marginBottom: 5, // Adds spacing before timestamp
  },
  leftMessageArrow: {
    position: 'absolute',
    top: 0,
    left: -8,
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#232626',
  },
  rightMessageArrow: {
    position: 'absolute',
    top: 0,
    right: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderTopColor: '#154d37',
  },
  timeAndReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  timeText: {
    fontSize: 10,
    color: '#8aa69b',
  },
  tickIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
});

export default MessageBubble;
