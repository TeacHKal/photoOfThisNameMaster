import { configureStore } from '@reduxjs/toolkit';
import photoReducer from "../features/photo/reducer"
import rootReducer from './root-reducer'

const store = configureStore({
    reducer: {...rootReducer}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;