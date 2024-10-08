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
  return response;
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
  return response;
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
  return response;
};

export { onLeaveApplication, onCompansationApplication, onFuelApplication };
