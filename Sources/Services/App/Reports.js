import { Functions } from '../../Utils';
import { FetchMethod, URL } from '../Api';

const onInOut = async ({ fromDate, toDate }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.inOutReport,
    Params: { employeeStatus: '-1', fromDate: fromDate, toDate: toDate },
  });
  return response;
};

const onSalary = async ({ fromMonth, toMonth }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.salaryReport,
    Params: {
      employeeStatus: '-1',
      fromMonth: Functions.formatDate(fromMonth, 'YYYYMM'),
      toMonth: Functions.formatDate(toMonth, 'YYYYMM'),
    },
  });
  return response;
};

const getAttendence = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.attendenceReport}?ToDate=` + formattedDate,
  });
  return response;
};

export { onInOut, onSalary, getAttendence };
