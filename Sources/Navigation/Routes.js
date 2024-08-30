import { useCallback, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import { useLocalStorage } from '../Hooks';
import { useSelector } from 'react-redux';
import { RNNoInternet } from '../Common';
import Drawer from './Drawer';
import {
  AttendanceReport,
  CompensationApplication,
  ForgotPassword,
  FuelApplication,
  InOutReport,
  LeaveApplication,
  Login,
  NewPassword,
  SalaryReport,
  SignUp,
  UpcomingLeave,
  VerifyCode,
} from '../Screens';

const Stack = createStackNavigator();

const Routes = () => {
  const {} = useLocalStorage();
  const { userData } = useSelector(({ UserReducer }) => UserReducer);
  const hasUser = userData?.user ? true : false;

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const Screens = useCallback(() => {
    return (
      <Stack.Navigator
        initialRouteName={userData?.user ? NavRoutes.Home : NavRoutes.Login}
        screenOptions={NavConfigs.screenOptions}>
        {/* Auth */}
        <Stack.Screen name={NavRoutes.Login} component={Login} />
        {/* <Stack.Screen name={NavRoutes.SignUp} component={SignUp} /> */}
        <Stack.Screen name={NavRoutes.VerifyCode} component={VerifyCode} />
        <Stack.Screen name={NavRoutes.NewPassword} component={NewPassword} />
        <Stack.Screen
          name={NavRoutes.ForgotPassword}
          component={ForgotPassword}
        />

        {/* App */}
        <Stack.Screen name={NavRoutes.Home} component={Drawer} />
        <Stack.Screen
          name={NavRoutes.UpcomingLeave}
          component={UpcomingLeave}
        />
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
      </Stack.Navigator>
    );
  }, [hasUser]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
        <RNNoInternet />
        <Toasts />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Routes;
