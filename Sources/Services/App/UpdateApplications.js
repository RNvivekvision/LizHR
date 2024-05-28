import { Functions } from '../../Utils';
import { FetchMethod, URL } from '../Api';

const onUpdateFuel = async ({ ids, status }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.updateFuel,
    Params: {
      ids: ids,
      updateTransactionStatus: status,
    },
  });
  return Functions.handleResponse(response);
};

const onUpdateLeave = async ({ ids, status }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.updateLeave,
    Params: {
      ids: ids,
      updateTransactionStatus: status,
    },
  });
  return Functions.handleResponse(response);
};

const onUpdateCompansation = async ({ ids, status }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.updateCompansation,
    Params: {
      ids: ids,
      updateTransactionStatus: status,
    },
  });
  return Functions.handleResponse(response);
};

export { onUpdateFuel, onUpdateLeave, onUpdateCompansation };
