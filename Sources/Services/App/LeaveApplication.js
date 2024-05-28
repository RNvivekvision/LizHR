import { FetchMethod, URL } from '../Api';

const onLeaveApplication = async ({ appStatus, fromDate, toDate }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.leaveApplication,
    Params: {
      applicationStatus: appStatus ?? 0,
      fromDate: fromDate || '2024-05-01T00:00:00.000Z',
      toDate: toDate || '2024-06-30T05:30:00.000Z',
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

export { onLeaveApplication };
