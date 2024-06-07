import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../../../Theme';
import { RNImage, RNStyles, RNText } from '../../../Common';
import { Images } from '../../../Constants';
import { LIRow } from '../../Common';

const RenderSalaryReport = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress?.(item)}
      style={styles.container}>
      <RNImage source={Images.defaultUser} style={styles.userImage} />
      <View style={{ flex: 1 }}>
        <RNText pBottom={hp(0.5)} size={FontSize.font12} color={Colors.Primary}>
          {item?.displayName}
        </RNText>
        <View style={RNStyles.flexRowBetween}>
          <View style={{ width: '45%' }}>
            <LIRow title={'Gross : '} text={`${item?.finalSalary} Rs.`} />
            <LIRow
              title={'Absent : '}
              text={`${item?.absentSalary} (${item?.absentDays} Leave)`}
            />
          </View>
          <View style={styles.devider} />
          <View>
            <RNText
              pBottom={hp(0.5)}
              color={Colors.employee}
              align={'center'}
              size={FontSize.font11}>
              {'Final Salary'}
            </RNText>
            <RNText
              color={Colors.Primary}
              size={FontSize.font14}
              family={FontFamily.Medium}>
              {item?.finalSalary + ' Rs.'}
            </RNText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const imgSize = wp(13);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  userImage: {
    width: imgSize,
    height: imgSize,
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  devider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.Placeholder,
  },
});

export default RenderSalaryReport;
