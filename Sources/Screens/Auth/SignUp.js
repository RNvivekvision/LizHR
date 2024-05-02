import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Images } from '../../Constants';
import { RNText, RNContainer, RNKeyboardAvoid, RNButton } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import {
  DontHaveAccount,
  RememberMe,
  LIOnboardingIcon,
  LIInput,
} from '../../Components';
import { NavRoutes } from '../../Navigation';

const SignUp = ({ navigation }) => {
  const [State, setState] = useState({
    showPassword: false,
    showRePassword: false,
    rememberMe: false,
  });
  const styles = useStyles();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  return (
    <RNContainer barStyle={'dark-content'}>
      <RNKeyboardAvoid>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LIOnboardingIcon />

          <View style={styles.content}>
            <RNText style={styles.title}>{'Sign UP'}</RNText>
            <RNText style={styles.description}>
              {'Sign Up Now To Begin An Amazing Journey.'}
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
              onSubmitEditing={() => rePasswordRef.current.focus()}
              icon={State.showPassword ? Images.show : Images.hide}
              secureTextEntry={!State.showPassword}
              onIconPress={() =>
                setState(p => ({ ...p, showPassword: !p.showPassword }))
              }
            />
            <LIInput
              ref={rePasswordRef}
              title={'Re-enter Password'}
              placeholder={'Enter your Re-enter Password'}
              returnKeyType={'done'}
              icon={State.showRePassword ? Images.show : Images.hide}
              secureTextEntry={!State.showRePassword}
              onIconPress={() =>
                setState(p => ({ ...p, showRePassword: !p.showRePassword }))
              }
            />

            <RememberMe
              value={State.rememberMe}
              onPress={v => setState(p => ({ ...p, rememberMe: v }))}
            />

            <RNButton title={'Sign Up'} />

            <DontHaveAccount isSignup={true} />
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

export default SignUp;
