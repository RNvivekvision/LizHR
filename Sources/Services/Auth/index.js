import { Platform } from 'react-native';
import { getIp } from '@mobeuv/react-native-check-ip';
import DeviceInfo from 'react-native-device-info';
import { jwtDecode } from 'jwt-decode';
import { FetchMethod, URL } from '../Api';

const onLogin = async ({ username, password }) => {
  const result = await getIp();
  const response = await FetchMethod.POST({
    EndPoint: URL.Login,
    NeedToken: false,
    Params: {
      userName: username,
      password: password,
      fcmToken: null,
      deviceDetails: {
        browser: `${Platform.OS}App`,
        browserVersion: DeviceInfo.getVersion(),
        osType: Platform.OS,
        osVersion: DeviceInfo.getSystemVersion(),
        deviceType: 'mobile',
        ipAddress: result.ipv4,
      },
    },
  });
  console.log('onLogin -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    const token = response?.responseData?.token;
    const decodeData = jwtDecode(token);
    return { ...decodeData, token: token };
  }
};

const onForgotPassword = async username => {
  const response = await FetchMethod.POST({
    EndPoint: `${URL.forgotPassword}?userName=${username}`,
    NeedToken: false,
  });
  // console.log('onForgotPasswordPress -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) return response;
};

const onVerifyOtp = async ({ otp, password }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.verifyOtp,
    NeedToken: false,
    Params: {
      verificationCode: otp,
      password: password,
    },
  });
  // console.log('onVerifyOtp -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) return response;
};

export { onLogin, onForgotPassword, onVerifyOtp };
