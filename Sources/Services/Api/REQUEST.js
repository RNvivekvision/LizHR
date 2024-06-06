// import Axios from 'axios';
import { Functions } from '../../Utils';
import URL from './URL';
import NetInfo from '@react-native-community/netinfo';

const REQUEST = async ({
  Method,
  EndPoint,
  Params,
  IsformData = false,
  NeedToken = true,
}) => {
  const { isConnected } = await NetInfo.fetch();
  if (!isConnected) return nointernetResponse;

  const appData = await Functions.getAppData();
  const Headers = Header(NeedToken, appData?.user?.token, IsformData);
  const payload = {
    method: Method,
    headers: Headers,
    data: Params,
    url: URL.UserUrl + EndPoint,
  };
  // console.log('payload -> ', JSON.stringify(payload, null, 2));
  // const response = await Axios(payload);
  // return response.data;

  // fetch method......
  const responseJson = await Promise.race([
    fetch(payload.url, {
      method: Method,
      body: JSON.stringify(Params),
      headers: Headers,
    }),
    new Promise(res => setTimeout(() => res(resolving), 10000)),
  ]);
  // console.log('responseJson -> ', JSON.stringify(responseJson, null, 2));
  const response = await responseJson?.json();
  // console.log('response -> ', JSON.stringify(response, null, 2));
  return response;
};
const Header = (NeedToken, Token, IsformData) => {
  let apiHeaders = {
    Accept: '*/*',
    'Content-Type': IsformData ? 'multipart/form-data' : 'application/json',
  };
  if (NeedToken) {
    apiHeaders = { ...apiHeaders, Authorization: `Bearer ${Token}` };
  }
  return apiHeaders;
};
const resolving = { json: () => errorResponse };
const errorResponse = {
  isSuccess: false,
  responseData: {},
  errorCode: 0,
  errorMessage: 'Something went wrong. Please try again.',
  errorTitle: '',
};
const nointernetResponse = {
  ...errorResponse,
  errorMessage: 'Please turn on your internet.',
};
export default REQUEST;
