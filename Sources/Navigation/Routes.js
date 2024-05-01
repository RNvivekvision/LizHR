import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { NavConfigs, NavRoutes } from './index';
import Drawer from './Drawer';
import {
  Attendance,
  ForgotPassword,
  Login,
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
