import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { Functions } from '../../Utils';

const LIAttendence = ({ item }) => {
  // console.log('Attendence Item -> ', JSON.stringify(item, null, 2));
  const [State, setState] = useState({ profilePic: Images.defaultUser });
  const regular = {
    A: { key: 'A', color: Colors.absent },
    P: { key: 'P', color: Colors.present },
    L: { key: 'L', color: Colors.Black },
    HL: { key: 'HL', color: Colors.halfLeave },
  };
  const flag = regular[item?.dayFlag] || regular['A'];
  const styles = useStyles({ color: flag.color });
  const inTime = Functions.formatDate(item?.thumbInTime, 'hh:mm A');
  const outTime = Functions.formatDate(item?.thumbOutTime, 'hh:mm A');

  useEffect(() => {
    (async () => {
      const pic = await Functions.getProfilePic(item?.profileImageUrl);
      setState(p => ({ ...p, profilePic: pic }));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContentContainer}>
        <RNImage source={State.profilePic} style={styles.userImage} />
        <View style={{ flex: 1 }}>
          <RNText pBottom={hp(1)} size={FontSize.font12} color={Colors.Primary}>
            {item?.employee?.displayName}
          </RNText>
          <RNText
            size={FontSize.font10}
            color={
              Colors.employee
            }>{`${item?.departmentName}  |  ${item?.designation}`}</RNText>
        </View>
        <View style={styles.presentContainer}>
          <RNText
            family={FontFamily.Medium}
            size={FontSize.font12}
            color={flag.color}>
            {flag.key}
          </RNText>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Row title={'Shift'} text={item?.shiftName} />
        <Row title={'In Time'} text={inTime} icon={Images.inTime} />
        <Row
          title={'Out Time'}
          text={outTime}
          icon={Images.outTime}
          last={true}
        />
      </View>
    </View>
  );
};

const Row = ({ title, text, icon, last }) => {
  const styles = useStyles({ last });

  return (
    <View style={styles.rowContainer}>
      <RNText size={FontSize.font10} color={Colors.employee}>
        {title}
      </RNText>
      <View style={styles.titleDivider} />
      <View style={RNStyles.flexRow}>
        <RNText size={FontSize.font12}>{text}</RNText>
        {icon && <RNImage source={icon} style={styles.inOutIcon} />}
      </View>
    </View>
  );
};

const imgSize = wp(10);
const presendSize = wp(7);
const useStyles = ({ color, last }) => {
  return StyleSheet.create({
    container: {
      ...RNStyles.shadow,
      backgroundColor: Colors.White,
      marginHorizontal: wp(4),
      marginBottom: hp(2),
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      borderRadius: wp(4),
    },
    userImage: {
      width: imgSize,
      height: imgSize,
      borderRadius: wp(3),
      marginRight: wp(3),
    },
    imageContentContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    rowContainer: {
      width: '32%',
      borderRightWidth: last ? 0 : 1,
      marginRight: wp(5),
      borderRightColor: Colors.Placeholder,
    },
    titleDivider: {
      width: wp(6),
      height: 1,
      backgroundColor: Colors.Placeholder,
      borderRadius: 100,
      marginVertical: hp(0.8),
    },
    inOutIcon: {
      width: wp(3),
      height: wp(3),
      marginHorizontal: wp(3),
    },
    presentContainer: {
      ...RNStyles.center,
      width: presendSize,
      height: presendSize,
      borderWidth: 1,
      borderRadius: wp(2),
      borderColor: color,
      backgroundColor: `${color}` + '10',
    },
    timeContainer: {
      ...RNStyles.flexRow,
      paddingTop: hp(2),
      paddingHorizontal: wp(2),
    },
  });
};

export default LIAttendence;
