import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
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
          backgroundColor: isMyMessage ? '#DCF8C6' : '#FFFFFF',
          borderTopLeftRadius: isMyMessage ? 15 : 0,
          borderTopRightRadius: isMyMessage ? 0 : 15,
        },
      ]}
    >
      {isMyMessage && <View style={styles.rightMessageArrow} />}
      {!isMyMessage && <View style={styles.leftMessageArrow} />}
      
      {message.isLoading ? (
        <LoadingDots />
      ) : message?.imageUri ? (
        <Image 
          source={{ uri: message?.imageUri }} 
          style={styles.image}
        />
      ) : (
        <MarkdownDisplay style={styles.markdownDisplay}>
          {message.content}
        </MarkdownDisplay>
      )}

      <View style={styles.timeAndReadContainer}>
        <Text style={styles.timeText}>{dayjs(message.time).format('HH:mm')}</Text>
        {isMyMessage && (
          <Image
            source={TickIcon}
            tintColor={isMessageRead ? '#34B7F1' : '#BDC3C7'}
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
  },
  markdownDisplay: {
    body: {
      fontSize: RFValue(14),
      color: '#303030',
      lineHeight: 18,
    },
    link: {
      color: '#1A73E8',
    },
    blockquote: {
      color: '#303030',
      backgroundColor: '#F0F0F0',
      borderRadius: 4,
      padding: 5,
    },
    code_inline: {
      backgroundColor: '#ECEFF1',
      color: '#303030',
      borderRadius: 5,
      paddingHorizontal: 3,
    },
  },
  image: {
    height: RFPercentage(28),
    width: RFPercentage(35),
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  leftMessageArrow: {
    position: 'absolute',
    top: 0,
    left: -6,
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  rightMessageArrow: {
    position: 'absolute',
    top: 0,
    right: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderTopColor: '#DCF8C6',
  },
  timeAndReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timeText: {
    fontSize: 10,
    color: '#757575',
  },
  tickIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
});

export default MessageBubble;
