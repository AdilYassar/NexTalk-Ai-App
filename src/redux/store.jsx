import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    persistReducer,
    persistStore,
    REGISTER
} from 'redux-persist';

import rootReducer from "./rootReducer";
import reduxStorage from "./storage";

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    blacklist: [],
    whitelist: ['chats']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST]
        }
    })
});

export const persistor = persistStore(store);
