import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllLateEarlyData,
  getAllLocationWiseData,
  getTotalPresentAbsent,
  onGetBranches,
} from '../../Services';

const getAllBranches = createAsyncThunk('getAllBranches', async () => {
  try {
    const response = await onGetBranches();
    return response?.responseData;
  } catch (e) {
    console.log('Error getAllBranches -> ', e);
  }
});

const getAllPresentAbsent = createAsyncThunk(
  'getAllPresentAbsent',
  async ({ toDate }) => {
    try {
      const response = await getTotalPresentAbsent({ toDate: toDate });
      return response?.status === 401 ? response : response?.responseData;
    } catch (e) {
      return { responseData: [] };
    }
  },
);

const getAllLocationWise = createAsyncThunk(
  'getAllLocationWise',
  async ({ toDate }) => {
    try {
      const response = await getAllLocationWiseData({ toDate: toDate });
      return response?.responseData;
    } catch (e) {
      console.log('Error getAllLocationWise -> ', e);
    }
  },
);

const getAllLateEarly = createAsyncThunk(
  'getAllLateEarly',
  async ({ toDate }) => {
    try {
      const response = await getAllLateEarlyData({ toDate: toDate });
      return response?.responseData;
    } catch (e) {
      console.log('Error getAllLateEarly -> ', e);
    }
  },
);

export {
  getAllPresentAbsent,
  getAllBranches,
  getAllLocationWise,
  getAllLateEarly,
};
