import { FetchMethod, URL } from '../Api';

const onForgotPassword = async username => {
  const response = await FetchMethod.POST({
    EndPoint: `${URL.forgotPassword}?userName=${username}`,
    NeedToken: false,
  });
  // console.log('onForgotPasswordPress -> ', JSON.stringify(response, null, 2));
  if (response?.isSuccess) {
    return response;
  } else {
    alert(response?.errorMessage);
    return null;
  }
};

export { onForgotPassword };
