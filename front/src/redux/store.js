import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  // 5. store에 silde 등록
  reducer: {
    auth: authReducer,
  },
});

export default store;
