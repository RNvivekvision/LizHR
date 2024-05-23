const BASE_URL = 'https://services.lizhr.com';

const URL = {
  BaseUrl: BASE_URL,
  UserUrl: `${BASE_URL}/api/User/`,
  Login: 'LoginAuthenticate',
  forgotPassword: 'SendResetPasswordOTP',
  verifyOtp: 'ResetPasswordWithOTP',
};

export default URL;
