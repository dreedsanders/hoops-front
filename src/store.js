import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Reducers/UserReducer";
import postReducer from "./Reducers/PostReducer";
import playerReducer from "./Reducers/PlayerReducer";
import nbaReducer from "./Reducers/NbaReducer";
import likeReducer from "./Reducers/LikeReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
  playerState: playerReducer,
  nbaState: nbaReducer,
  likeState: likeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
