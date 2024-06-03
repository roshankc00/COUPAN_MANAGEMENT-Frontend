import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/app/(auth)/_redux/auth.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
const preReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
  reducer: preReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);
