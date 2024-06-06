import { Functions } from '../../Utils';
import { FetchMethod, URL } from '../Api';

const onGetBranches = async () => {
  const response = await FetchMethod.POST({
    EndPoint: URL.branches,
    Params: {},
  });
  return Functions.handleResponse(response);
};

const getTotalPresentAbsent = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.totalPresentAbsent}?ToDate=` + formattedDate,
  });
  return response;
  // return Functions.handleResponse(response);
};

const getAllLocationWiseData = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.LocationWise}?ToDate=` + formattedDate,
  });
  return response;
  // return Functions.handleResponse(response);
};

const getAllLateEarlyData = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.LateEarly}?ToDate=` + formattedDate,
  });
  return response;
  // return Functions.handleResponse(response);
};

export {
  onGetBranches,
  getTotalPresentAbsent,
  getAllLocationWiseData,
  getAllLateEarlyData,
};
