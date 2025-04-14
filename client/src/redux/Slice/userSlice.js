import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  selectedChat: null,
  messages: [],
  lightTheme: true,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setTheme: (state, action) => {
      state.lightTheme = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  setSelectedChat,
  setMessages,
  setTheme,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
