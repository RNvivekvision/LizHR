import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import { LIRow } from '../../Common';
import { Images } from '../../../Constants';

const RenderInOut = ({ item }) => {
  return (
    <View style={styles.container}>
      <LIRow
        title={'Employee : '}
        text={item.name}
        isTitle={true}
        style={{ marginBottom: hp(0.5) }}
      />
      <Row
        title1={'Date : '}
        title2={'In Time : '}
        text1={item.date}
        text2={item.inTime}
        icon={Images.inTime}
      />
      <Row
        title1={'Present Hour : '}
        title2={'Out Time : '}
        text1={item.presentHours}
        text2={item.outTime}
        icon={Images.outTime}
      />
    </View>
  );
};

const Row = ({ title1, title2, text1, text2, icon }) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowTextContainer}>
        <RNText size={FontSize.font10} color={Colors.employee}>
          {title1}
        </RNText>
        <RNText size={FontSize.font10}>{text1}</RNText>
      </View>
      {icon && <RNImage source={icon} style={styles.inOutIcon} />}
      <View style={styles.rowTextContainer}>
        <RNText size={FontSize.font10} color={Colors.employee}>
          {title2}
        </RNText>
        <RNText size={FontSize.font10}>{text2}</RNText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(4),
  },
  rowContainer: {
    ...RNStyles.flexRow,
    paddingVertical: hp(0.5),
    flex: 1,
  },
  rowTextContainer: {
    ...RNStyles.flexRow,
    width: '30%',
  },
  inOutIcon: {
    width: wp(3),
    height: wp(3),
    marginHorizontal: wp(2),
  },
});

export default RenderInOut;
