import { useRef, useState } from 'react';
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

const Login = ({ navigation }) => {
  const [State, setState] = useState({ showPassword: false });
  const styles = useStyles();
  const passwordRef = useRef();

  return (
    <RNContainer barStyle={'dark-content'}>
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
            />
            <LIInput
              ref={passwordRef}
              title={'Password'}
              placeholder={'Enter your password'}
              returnKeyType={'done'}
              icon={State.showPassword ? Images.show : Images.hide}
              onIconPress={() =>
                setState(p => ({ ...p, showPassword: !p.showPassword }))
              }
            />

            <RememberMe onPress={v => console.log({ v })}>
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

            <RNButton
              title={'Log In'}
              onPress={() => navigation.replace(NavRoutes.Home)}
            />

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
