import { useMemo, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import {
  RNText,
  RNContainer,
  RNKeyboardAvoid,
  RNButton,
  RNStyles,
} from '../../Common';
import { Colors, FontFamily, FontSize, hp, otpTheme, wp } from '../../Theme';
import { DontHaveAccount, LIOnboardingIcon } from '../../Components';
import { useTimer } from '../../Hooks';
import { onForgotPassword, onVerifyOtp } from '../../Services';
import { NavRoutes } from '../../Navigation';

const VerifyCode = ({ navigation, route }) => {
  const { username } = route.params;
  console.log({ username });
  const styles = useStyles();
  const { time, isFinished, resetTimer } = useTimer();
  const [State, setState] = useState({
    otp: '',
    verifyPressed: false,
    isLoading: false,
  });

  const errorOtp = useMemo(() => {
    return State.verifyPressed && State.otp.length !== 6;
  }, [State.otp.length, State.verifyPressed]);
  console.log({ errorOtp });

  const resendOtp = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      await onForgotPassword(State.email);
      resetTimer();
    } catch (e) {
      console.log('Error resendOtp -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onVerifyPress = async () => {
    setState(p => ({ ...p, verifyPressed: true }));
    if (State.otp.length !== 6) return;

    navigation.navigate(NavRoutes.NewPassword, { otp: State.otp });
  };

  return (
    <RNContainer isLoading={State.isLoading} barStyle={'dark-content'}>
      <RNKeyboardAvoid>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LIOnboardingIcon />

          <View style={styles.content}>
            <RNText style={styles.title}>{'Verify Code'}</RNText>
            <RNText style={styles.description}>
              {`Enter your code that we sent through your Mail ID.`}
            </RNText>

            <RNText style={styles.inputOtp}>{'Input Your OTP'}</RNText>
            <OtpInput
              numberOfDigits={6}
              onTextChange={otp =>
                setState(p => ({ ...p, otp, verifyPressed: false }))
              }
              autoFocus={false}
              theme={errorOtp ? otpTheme.errorTheme : otpTheme.theme}
              onFilled={Keyboard.dismiss}
            />
            <RNButton
              title={'Resend OTP'}
              disable={!isFinished}
              onPress={resendOtp}
              style={styles.ResendOtp}
              textStyle={{
                color: !isFinished ? Colors.Black : Colors.White,
                fontFamily: FontFamily.Medium,
              }}
            />

            <View style={styles.requestingOtp}>
              <RNText size={FontSize.font14} color={Colors.InputTitle}>
                {'You can request OTP after '}
              </RNText>
              <RNText size={FontSize.font14} color={Colors.InputTitle}>
                {time}
              </RNText>
            </View>

            <RNButton
              title={'Verify'}
              style={styles.button}
              onPress={onVerifyPress}
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
      flex: 1,
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
    inputOtp: {
      fontSize: FontSize.font12,
      color: Colors.InputTitle,
      paddingTop: hp(2),
    },
    ResendOtp: {
      width: wp(40),
      alignSelf: 'center',
      marginTop: hp(2),
      borderRadius: wp(2),
    },
    requestingOtp: {
      ...RNStyles.flexRow,
      alignSelf: 'center',
    },
    button: {
      marginTop: hp(4),
    },
  });
};

export default VerifyCode;
