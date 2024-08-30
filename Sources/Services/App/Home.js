import { FetchMethod, URL } from '../Api';

const onGetBranches = async () => {
  const response = await FetchMethod.POST({
    EndPoint: URL.branches,
    Params: {},
  });
  return response;
};

const getTotalPresentAbsent = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.totalPresentAbsent}?ToDate=` + formattedDate,
  });
  return response;
};

const getAllLocationWiseData = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.LocationWise}?ToDate=` + formattedDate,
  });
  return response;
};

const getAllLateEarlyData = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.LateEarly}?ToDate=` + formattedDate,
  });
  return response;
};

export {
  onGetBranches,
  getTotalPresentAbsent,
  getAllLocationWiseData,
  getAllLateEarlyData,
};
