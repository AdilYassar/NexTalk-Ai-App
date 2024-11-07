import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: [],
    currentChatId: ''
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessages: (state, action) => {
            const { chatId, message } = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
            if (chatIndex !== -1) {
                state.chats[chatIndex].messages.push(message);
            }
        },
        clearAllChats: (state) => {
            state.chats = [];
        },
        changeCurrentChatId: (state, action) => {
            state.currentChatId = action.payload.chatId;
        },
        createNewChat: (state, action) => {
            const { chatId, messages = [], summary = '' } = action.payload;
            state.chats.push({ id: chatId, messages, summary });
        },
        clearChat: (state, action) => {
            const chatIndex = state.chats.findIndex(chat => chat.id === action.payload.chatId);
            if (chatIndex !== -1) {
                state.chats[chatIndex].messages = [];
            }
        },
        deleteChat: (state, action) => {
            state.chats = state.chats.filter(chat => chat.id !== action.payload.chatId);
        },
        updateChatSummary: (state, action) => {
            const { chatId, messages, summary } = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
            if (chatIndex !== -1) {
                state.chats[chatIndex].summary = summary;
                if (messages) {
                    state.chats[chatIndex].messages = messages;
                }
            }
        },
        markMessageAsRead: (state, action) => {
            const { chatId, messageId } = action.payload;
            const chat = state.chats.find(chat => chat.id === chatId);
            if (chat) {
                const message = chat.messages.find(msg => msg.id === messageId); // Corrected here
                if (message) {
                    message.isMessageRead = true;
                }
            }
        },
    }
});

export const { 
    updateChatSummary, 
    deleteChat, 
    clearChat, 
    markMessageAsRead,
    clearAllChats, 
    createNewChat, 
    addMessages, 
    changeCurrentChatId 
} = chatSlice.actions;

export const selectChats = state => state.chat.chats;
export const selectCurrentChatId = state => state.chat.currentChatId;
export default chatSlice.reducer;
