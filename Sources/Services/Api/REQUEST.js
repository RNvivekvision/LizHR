// import Axios from 'axios';
import { Functions } from '../../Utils';
import URL from './URL';

const REQUEST = async ({
  Method,
  EndPoint,
  Params,
  IsformData = false,
  NeedToken = true,
}) => {
  const appData = await Functions.getAppData();
  const Headers = Header(NeedToken, appData?.user?.token, IsformData);
  const options = {
    method: Method,
    headers: Headers,
    data: Params,
    url: URL.UserUrl + EndPoint,
  };
  // console.log('payload -> ', JSON.stringify(options, null, 2));
  // const response = await Axios(options);
  // return response.data;

  // fetch method......
  const wait = timeout => new Promise(r => setTimeout(r, timeout));
  const responseJson = await Promise.race([
    fetch(options.url, {
      method: Method,
      body: JSON.stringify(Params),
      headers: Headers,
    }),
    new Promise(res => setTimeout(() => res(resolving), 10000)),
  ]);
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
export default REQUEST;
