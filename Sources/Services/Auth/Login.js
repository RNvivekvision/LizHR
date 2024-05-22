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
  if (response?.isSuccess) {
    const token = response?.responseData?.token;
    const decodeData = jwtDecode(token);
    return { ...decodeData, token: token };
  } else {
    alert(response?.errorMessage);
    return null;
  }
};

export { onLogin };
