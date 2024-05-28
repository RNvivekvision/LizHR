import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { RNText, RNContainer, RNKeyboardAvoid, RNButton } from '../../Common';
import { DontHaveAccount, LIInput, LIOnboardingIcon } from '../../Components';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { NavRoutes } from '../../Navigation';
import { Validation } from '../../Utils';
import { onForgotPassword } from '../../Services';

const ForgotPassword = ({ navigation }) => {
  const [State, setState] = useState({
    email: '',
    submitPressed: false,
    isLoading: false,
  });
  const errorEmail =
    State.submitPressed && !Validation.isUsernameValid(State.email);
  const noErrors = Validation.isUsernameValid(State.email);

  const onGetCodePress = async () => {
    setState(p => ({ ...p, submitPressed: true }));
    if (!noErrors) return;
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onForgotPassword(State.email);
      if (!response) return;

      navigation.navigate(NavRoutes.VerifyCode, {
        username: State.email,
      });
    } catch (e) {
      console.log('Error onForgotPassword -> ', e);
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
            <RNText style={styles.title}>{'Forgot Password'}</RNText>
            <RNText style={styles.description}>
              {`Forgot your password let's change it.`}
            </RNText>
            <LIInput
              title={'Email'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
              returnKeyType={'done'}
              onSubmitEditing={Keyboard.dismiss}
              value={State.email}
              onChangeText={v => setState(p => ({ ...p, email: v.trim() }))}
              error={errorEmail}
            />
            <RNButton
              title={'Get Code'}
              style={styles.button}
              onPress={onGetCodePress}
            />
            {/* <DontHaveAccount /> */}
          </View>
        </ScrollView>
      </RNKeyboardAvoid>
    </RNContainer>
  );
};

const styles = StyleSheet.create({
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
  button: {
    marginTop: hp(4),
  },
});

export default ForgotPassword;
