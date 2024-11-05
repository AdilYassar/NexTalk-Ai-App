import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    chats: [],
    currentChatId: ''
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        clearAllChats: state => {
            state.chats = [];
        },
        changeCurrentChatId:(state,action)=>{
            state.currentChatId=action.payload.chatId;
        }
    }
});

export const { clearAllChats, changeCurrentChatId } = chatSlice.actions;
export const selectChats = state => state.chat.chats;
export const selectCurrentChatId = state => state.chat.currentChatId;
export default chatSlice.reducer;
