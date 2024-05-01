import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { NavConfigs, NavRoutes } from './index';
import Drawer from './Drawer';
import {
  Attendance,
  AttendanceReport,
  CompensationApplication,
  ForgotPassword,
  FuelApplication,
  InOutReport,
  LeaveApplication,
  Login,
  SalaryReport,
  SignUp,
  UpcomingLeave,
  VerifyCode,
} from '../Screens';

const Stack = createStackNavigator();

const Routes = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
        {/* App */}
        <Stack.Screen name={NavRoutes.Home} component={Drawer} />
        <Stack.Screen
          name={NavRoutes.UpcomingLeave}
          component={UpcomingLeave}
        />
        <Stack.Screen name={NavRoutes.Attendance} component={Attendance} />
        <Stack.Screen name={NavRoutes.InOutReport} component={InOutReport} />
        <Stack.Screen
          name={NavRoutes.AttendanceReport}
          component={AttendanceReport}
        />
        <Stack.Screen name={NavRoutes.SalaryReport} component={SalaryReport} />
        <Stack.Screen
          name={NavRoutes.FuelApplication}
          component={FuelApplication}
        />
        <Stack.Screen
          name={NavRoutes.LeaveApplication}
          component={LeaveApplication}
        />
        <Stack.Screen
          name={NavRoutes.CompensationApplication}
          component={CompensationApplication}
        />

        {/* Auth */}
        <Stack.Screen name={NavRoutes.Login} component={Login} />
        <Stack.Screen name={NavRoutes.SignUp} component={SignUp} />
        <Stack.Screen name={NavRoutes.VerifyCode} component={VerifyCode} />
        <Stack.Screen
          name={NavRoutes.ForgotPassword}
          component={ForgotPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
