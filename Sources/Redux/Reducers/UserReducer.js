import { createSlice } from '@reduxjs/toolkit';
import {
  getAllBranches,
  getAllPresentAbsent,
  getAllLocationWise,
  getAllLateEarly,
} from '../ExtraReducers';

const initialState = {
  userData: {},
  branches: null,
  presentAbsent: null,
  presentAbsentLoading: false,
  locationWise: null,
  locationWiseLoading: false,
  lateEarly: null,
  lateEarlyLoading: false,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    setUser: (s, a) => {
      s.userData = a.payload;
    },
  },
  extraReducers: b => {
    // Branches...
    b.addCase(getAllBranches.fulfilled, (s, a) => {
      s.branches = a.payload;
    });

    // Present and Absents...
    b.addCase(getAllPresentAbsent.pending, (s, a) => {
      s.presentAbsentLoading = true;
    });
    b.addCase(getAllPresentAbsent.fulfilled, (s, a) => {
      s.presentAbsentLoading = false;
      s.presentAbsent = a.payload;
    });
    b.addCase(getAllPresentAbsent.rejected, (s, a) => {
      s.presentAbsentLoading = false;
    });

    // Location Wise...
    b.addCase(getAllLocationWise.pending, (s, a) => {
      s.locationWiseLoading = true;
    });
    b.addCase(getAllLocationWise.fulfilled, (s, a) => {
      s.locationWiseLoading = false;
      s.locationWise = a.payload;
    });
    b.addCase(getAllLocationWise.rejected, (s, a) => {
      s.locationWiseLoading = false;
    });

    // Late or Early Employees...
    b.addCase(getAllLateEarly.pending, (s, a) => {
      s.lateEarlyLoading = true;
    });
    b.addCase(getAllLateEarly.fulfilled, (s, a) => {
      s.lateEarlyLoading = false;
      s.lateEarly = a.payload;
    });
    b.addCase(getAllLateEarly.rejected, (s, a) => {
      s.lateEarlyLoading = false;
    });
  },
});

export const { setUser } = UserReducer.actions;
export default UserReducer.reducer;
