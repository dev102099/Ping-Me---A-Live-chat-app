import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import user from "../redux/Slice/userSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "pingme",
  storage,
  whitelist: ["user"], // Persist the entire 'user' slice
};

const rootReducer = combineReducers({ user });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
