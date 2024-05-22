import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNText, RNContainer, RNKeyboardAvoid, RNButton } from '../../Common';
import {
  LIInput,
  RememberMe,
  DontHaveAccount,
  LIOnboardingIcon,
} from '../../Components';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { NavRoutes } from '../../Navigation';
import { Images } from '../../Constants';
import { Functions, Validation } from '../../Utils';
import { useLocalStorage } from '../../Hooks';
import { onLogin } from '../../Services';

const Login = ({ navigation }) => {
  const { appData } = useLocalStorage();
  const [State, setState] = useState({
    username: '',
    password: '',
    showPassword: false,
    loginPressed: false,
    rememberMe: false,
    isLoading: false,
  });
  const styles = useStyles();
  const passwordRef = useRef();

  useEffect(() => {
    if (appData?.rememberMe) {
      setState(p => ({
        ...p,
        username: appData?.auth?.username,
        password: appData?.auth?.password,
        rememberMe: true,
      }));
    }
  }, [appData?.rememberMe]);

  // console.log('appData -> ', JSON.stringify(appData, null, 2));

  const Errors = {
    username: State.loginPressed && !Validation.isUsernameValid(State.username),
    password: State.loginPressed && !Validation.isPasswordValid(State.password),
    noError:
      Validation.isUsernameValid(State.username) &&
      Validation.isPasswordValid(State.password),
  };

  const onLoginPress = async () => {
    setState(p => ({ ...p, loginPressed: true }));
    if (!Errors.noError) return;

    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onLogin({
        username: State.username,
        password: State.password,
      });
      if (response) {
        await Functions.setAppData({
          user: response,
          auth: { username: State.username, password: State.password },
          rememberMe: State.rememberMe,
        });
        navigation.replace(NavRoutes.Home);
      }
    } catch (e) {
      console.error('Error onLoginPress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <RNContainer isLoading={State.isLoading} barStyle={'dark-content'}>
      <RNKeyboardAvoid>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LIOnboardingIcon />

          <View style={styles.content}>
            <RNText style={styles.title}>{'Login'}</RNText>
            <RNText style={styles.description}>
              {'Log In Now To Begin An Amazing Journey.'}
            </RNText>

            <LIInput
              title={'Username'}
              placeholder={'Enter your username'}
              keyboardType={'email-address'}
              onSubmitEditing={() => passwordRef.current.focus()}
              value={State.username}
              onChangeText={v => setState(p => ({ ...p, username: v.trim() }))}
              error={Errors.username}
            />
            <LIInput
              ref={passwordRef}
              title={'Password'}
              placeholder={'Enter your password'}
              returnKeyType={'done'}
              value={State.password}
              onChangeText={v => setState(p => ({ ...p, password: v.trim() }))}
              error={Errors.password}
              secureTextEntry={!State.showPassword}
              icon={State.showPassword ? Images.hide : Images.show}
              onIconPress={() =>
                setState(p => ({ ...p, showPassword: !p.showPassword }))
              }
            />

            <RememberMe
              value={State.rememberMe}
              onPress={v => setState(p => ({ ...p, rememberMe: v }))}>
              <TouchableOpacity
                onPress={() => navigation.navigate(NavRoutes.ForgotPassword)}
                activeOpacity={0.6}>
                <RNText
                  size={FontSize.font12}
                  family={FontFamily.Medium}
                  color={Colors.Primary}>
                  {'Forgot Password ?'}
                </RNText>
              </TouchableOpacity>
            </RememberMe>

            <RNButton title={'Log In'} onPress={onLoginPress} />

            <DontHaveAccount />
          </View>
        </ScrollView>
      </RNKeyboardAvoid>
    </RNContainer>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    content: {
      paddingHorizontal: wp(4),
    },
    title: {
      fontSize: FontSize.font24,
      fontFamily: FontFamily.Bold,
      color: Colors.Primary,
      paddingVertical: hp(1),
    },
    description: {
      fontSize: FontSize.font12,
      paddingBottom: hp(1),
    },
  });
};

export default Login;
