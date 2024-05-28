const BASE_URL = 'https://services.lizhr.com';

const URL = {
  BaseUrl: BASE_URL,
  UserUrl: `${BASE_URL}/api`,
  Login: '/User/LoginAuthenticate',
  forgotPassword: '/User/SendResetPasswordOTP',
  verifyOtp: '/User/ResetPasswordWithOTP',
  leaveApplication: '/LeaveApplication/GetAllLeaveApplications',
  compensation: '/CompensationApplication/GetAllCompensationApplications',
  fuelApplication: '/FuelAllowanceApplication/GetAllFuelAllowanceApplications',
};

export default URL;
