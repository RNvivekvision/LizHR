import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import RNText from './RNText';
import RNStyles from './RNStyles';

const RNSegment = ({ segments, selected, onChange }) => {
  if (segments?.length === 0) return;
  return (
    <View style={styles.container}>
      {segments.map((v, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.renderContainer,
            {
              backgroundColor: selected === i ? Colors.Primary : Colors.White,
            },
          ]}
          onPress={() => onChange?.(i)}>
          <RNText
            style={[
              styles.renderText,
              { color: selected === i ? Colors.White : Colors.Black },
            ]}>
            {v}
          </RNText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRow,
    ...RNStyles.shadow,
    marginHorizontal: wp(4),
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
    borderRadius: wp(3),
    backgroundColor: Colors.White,
    marginBottom: hp(3),
  },
  renderContainer: {
    ...RNStyles.center,
    flex: 1,
    paddingVertical: hp(1.5),
    marginHorizontal: wp(1),
    borderRadius: wp(3),
  },
  renderText: {
    fontSize: FontSize.font14,
    color: Colors.White,
    fontFamily: FontFamily.Medium,
  },
});

export default RNSegment;
