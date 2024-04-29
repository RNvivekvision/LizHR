import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontSize, wp } from '../../Theme';
import { Images } from '../../Constants';

const RememberMe = ({ containerStyle, onPress, children }) => {
  const [State, setState] = useState({ checked: false });

  const onCheckBoxPress = () => {
    setState(p => ({ ...p, checked: !p.checked }));
    onPress?.(!State.checked);
  };

  return (
    <View style={RNStyles.flexRowBetween}>
      <TouchableOpacity
        onPress={onCheckBoxPress}
        style={[styles.container, containerStyle]}
        activeOpacity={0.6}>
        <View style={RNStyles.flexRow}>
          <RNImage
            source={State.checked ? Images.checked : Images.uncheck}
            style={styles.icon}
          />
          <RNText
            size={FontSize.font12}
            pHorizontal={wp(2)}
            color={Colors.InputTitle}>
            {'Remember Me'}
          </RNText>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(4),
  },
  icon: {
    ...RNStyles.icon,
    borderRadius: wp(2),
  },
});

export default RememberMe;
