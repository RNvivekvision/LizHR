import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { RNText, RNContainer, RNKeyboardAvoid, RNButton } from '../../Common';
import { DontHaveAccount, LIInput, LIOnboardingIcon } from '../../Components';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { Validation } from '../../Utils';
import { onVerifyOtp } from '../../Services';

const NewPassword = ({ navigation, route }) => {
  const { otp } = route.params;
  console.log({ otp });
  const [State, setState] = useState({
    password: '',
    showPassword: false,
    isLoading: false,
    submitPressed: false,
  });

  const errorPassword =
    State.showPassword && !Validation.isPasswordValid(State.password);
  const noErrors = Validation.isPasswordValid(State.password);

  const onSubmitPress = async () => {
    setState(p => ({ ...p, submitPressed: true }));
    if (!noErrors) return;

    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onVerifyOtp({
        otp: otp,
        password: State.password,
      });
      if (!response) return;

      navigation.popToTop();
    } catch (e) {
      console.log('Error onSubmitPress -> ', e);
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
            <RNText style={styles.title}>{'New Password'}</RNText>
            <RNText style={styles.description}>
              {`Let's change your old password.`}
            </RNText>

            <LIInput
              title={'Password'}
              placeholder={'Enter your password'}
              returnKeyType={'done'}
              value={State.password}
              onChangeText={v => setState(p => ({ ...p, password: v.trim() }))}
              error={errorPassword}
              secureTextEntry={!State.showPassword}
              icon={State.showPassword ? Images.hide : Images.show}
              onIconPress={() =>
                setState(p => ({ ...p, showPassword: !p.showPassword }))
              }
            />

            <RNButton
              title={'Submit'}
              style={styles.button}
              onPress={onSubmitPress}
            />

            <DontHaveAccount />
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

export default NewPassword;
