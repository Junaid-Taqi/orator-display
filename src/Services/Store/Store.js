import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
    persistStore,
} from "redux-persist";

import authReducer from "../Slices/AuthSlice";

/* ==============================
   ROOT REDUCER
============================== */

const rootReducer = combineReducers({
    auth: authReducer,
});

/* ==============================
   PERSIST CONFIG
============================== */

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["patient"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ==============================
   STORE
============================== */

const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});

/* ==============================
   PERSISTOR
============================== */

export const persistor = persistStore(Store);

export default Store;
