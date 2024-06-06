import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontSize, hp, wp } from '../../../Theme';
import { LIRow } from '../../Common';
import { Images } from '../../../Constants';
import { Functions } from '../../../Utils';

const format = 'hh:mm A';
const RenderInOut = ({ item }) => {
  const styles = useStyles({});
  const empName = item?.employee?.displayName;
  const inTime = Functions.formatDate(item?.inDateTime, format);
  const outTime = Functions.formatDate(item?.outDateTime, format);
  const date = Functions.formatDate(item?.eventDate);
  const presentHours = Functions.formatDate(item?.presentTime, 'hh:mm');

  return (
    <View style={styles.container}>
      <LIRow
        title={'Employee : '}
        text={empName}
        isTitle={true}
        style={{ marginBottom: hp(0.5) }}
      />
      <View style={RNStyles.flexRow}>
        <Column
          title1={'Date'}
          title2={'Present Hour'}
          text1={date}
          text2={presentHours + ' Hours'}
        />
        <Column
          title1={'In Time'}
          text1={inTime}
          title2={'Out Time'}
          text2={outTime}
          icon1={Images.inTime}
          icon2={Images.outTime}
          last={true}
        />
      </View>
    </View>
  );
};

const Column = ({ title1, title2, text1, text2, icon1, icon2, last }) => {
  const styles = useStyles({ last });
  return (
    <View style={styles.columnContainer}>
      <View style={styles.contentContainer}>
        {icon1 && <RNImage source={icon1} style={styles.inOutIcon} />}
        <RNText
          size={FontSize.font10}
          style={{ flex: 1 }}
          color={Colors.employee}>
          {title1}
        </RNText>
        <RNText size={FontSize.font10}>{':    ' + text1}</RNText>
      </View>
      <View style={styles.contentContainer}>
        <View style={RNStyles.flexRow}>
          {icon2 && <RNImage source={icon2} style={styles.inOutIcon} />}
          <RNText size={FontSize.font10} color={Colors.employee}>
            {title2}
          </RNText>
        </View>
        <RNText size={FontSize.font10}>{':    ' + text2}</RNText>
      </View>
    </View>
  );
};

const useStyles = ({ last }) => {
  return StyleSheet.create({
    container: {
      ...RNStyles.shadow,
      backgroundColor: Colors.White,
      marginHorizontal: wp(4),
      marginBottom: hp(2),
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(4),
      borderRadius: wp(4),
    },
    columnContainer: {
      flex: 1,
      borderRightWidth: last ? 0 : 1,
      borderRightColor: Colors.Placeholder,
      paddingRight: wp(2),
      paddingVertical: wp(1),
    },
    contentContainer: {
      ...RNStyles.flexRowBetween,
      paddingVertical: wp(0.5),
      paddingRight: wp(2),
    },
    inOutIcon: {
      width: wp(3),
      height: wp(3),
      marginHorizontal: wp(2),
    },
  });
};

export default RenderInOut;
