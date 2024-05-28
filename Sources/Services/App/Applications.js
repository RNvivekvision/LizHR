import { FetchMethod, URL } from '../Api';

const onLeaveApplication = async ({ appStatus, fromDate, toDate }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.leaveApplication,
    Params: {
      applicationStatus: appStatus ?? 0,
      fromDate: fromDate,
      toDate: toDate,
    },
  });
  // console.log('onLeaveApplication -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    return response;
  } else {
    alert(response?.errorMessage);
    return null;
  }
};

const onCompansationApplication = async ({
  id,
  approverIds,
  appStatus,
  fromDate,
  toDate,
}) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.compensation,
    Params: {
      id: id ?? 0,
      approverIds: approverIds ?? [],
      applicationStatus: appStatus ?? 0,
      fromDate: fromDate,
      toDate: toDate,
    },
  });
  // console.log('Compansation -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    return response;
  } else {
    alert(response?.errorMessage);
    return null;
  }
};

const onFuelApplication = async ({
  id,
  approverIds,
  appStatus,
  fromDate,
  toDate,
}) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.fuelApplication,
    Params: {
      id: id ?? 0,
      approverIds: approverIds ?? [],
      applicationStatus: appStatus ?? 0,
      fromDate: fromDate,
      toDate: toDate,
    },
  });
  // console.log('onFuelApplication -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    return response;
  } else {
    alert(response?.errorMessage);
    return null;
  }
};

export { onLeaveApplication, onCompansationApplication, onFuelApplication };
