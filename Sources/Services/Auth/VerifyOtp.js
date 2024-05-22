import { FetchMethod, URL } from '../Api';

const onVerifyOtp = async ({ otp, password }) => {
  const response = await FetchMethod.POST({
    EndPoint: URL.verifyOtp,
    NeedToken: false,
    Params: {
      verificationCode: otp,
      password: password,
    },
  });
  console.log('onVerifyOtp -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    return response;
  } else {
    alert(response?.errorMessage);
    return null;
  }
};

export { onVerifyOtp };
