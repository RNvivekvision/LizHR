import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    setUser: (s, a) => {
      s.userData = a.payload;
    },
  },
});

export const { setUser } = UserReducer.actions;
export default UserReducer.reducer;
