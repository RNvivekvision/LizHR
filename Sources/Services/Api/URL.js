const BASE_URL = 'https://services.lizhr.com';

const URL = {
  BaseUrl: BASE_URL,
  UserUrl: `${BASE_URL}/api`,
  Login: '/User/LoginAuthenticate',
  forgotPassword: '/User/SendResetPasswordOTP',
  verifyOtp: '/User/ResetPasswordWithOTP',
  fuelApplication: '/FuelAllowanceApplication/GetAllFuelAllowanceApplications',
  updateFuel: '/FuelAllowanceApplication/UpdateFuelAllowanceApplicationStatus',
  leaveApplication: '/LeaveApplication/GetAllLeaveApplications',
  updateLeave: '/LeaveApplication/UpdateLeaveApplicationStatus',
  compensation: '/CompensationApplication/GetAllCompensationApplications',
  updateCompansation:
    '/CompensationApplication/UpdateCompensationApplicationStatus',
  inOutReport: '/Report/GetThumbInOutDetails',
  salaryReport: '/Report/GetEmployeeMonthlySalary',
  attendenceReport: '/AdminDashboard/getDailyAttendance',
};

export default URL;
