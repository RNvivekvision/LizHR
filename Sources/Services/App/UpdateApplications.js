import { FetchMethod, URL } from '../Api';

const onUpdateFuel = async ({ ids, status }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.updateFuel,
    Params: {
      ids: ids,
      updateTransactionStatus: status,
    },
  });
  return response;
};

const onUpdateLeave = async ({ ids, status }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.updateLeave,
    Params: {
      ids: ids,
      updateTransactionStatus: status,
    },
  });
  return response;
};

const onUpdateCompansation = async ({ ids, status }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.updateCompansation,
    Params: {
      ids: ids,
      updateTransactionStatus: status,
    },
  });
  return response;
};

export { onUpdateFuel, onUpdateLeave, onUpdateCompansation };
