import { Functions } from '../../Utils';
import { FetchMethod, URL } from '../Api';

const onUpcomingLeave = async ({ toDate }) => {
  const formattedDate = new Date(toDate).toISOString();
  const response = await FetchMethod.GET({
    EndPoint: `${URL.upcomingLeave}?ToDate=` + formattedDate,
  });
  return Functions.handleResponse(response);
};

export { onUpcomingLeave };
