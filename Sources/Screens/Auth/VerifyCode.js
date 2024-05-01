import { useState } from 'react';
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

const VerifyCode = ({ navigation }) => {
  const { time, isFinished, resetTimer } = useTimer();
  const [State, setState] = useState({
    otp: '',
    disableResendButton: true,
    resendOtp: '',
  });
  const styles = useStyles();

  const onVerifyPress = () => {
    navigation.popToTop();
  };

  return (
    <RNContainer barStyle={'dark-content'}>
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
              onTextChange={otp => setState(p => ({ ...p, otp }))}
              autoFocus={false}
              theme={otpTheme}
              onFilled={Keyboard.dismiss}
            />
            <RNButton
              title={'Resend OTP'}
              disable={!isFinished}
              onPress={resetTimer}
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
