import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { Functions } from '../../Utils';

const LIAttendence = ({ item }) => {
  const [State, setState] = useState({ profilePic: Images.defaultUser });
  const regular = {
    A: { key: 'A', color: Colors.absent },
    P: { key: 'P', color: Colors.present },
  };
  const styles = useStyles({ color: regular[item?.dayFlag]?.color });
  const inTime = Functions.formatDate(item?.thumbInTime, 'hh:mm A');
  const outTime = Functions.formatDate(item?.thumbOutTime, 'hh:mm A');

  useEffect(() => {
    getProfilePic();
  }, []);

  const getProfilePic = useCallback(async () => {
    try {
      const { status } = await fetch(item?.profileImageUrl);
      const pic = status === 200 ? item?.profileImageUrl : Images.defaultUser;
      setState(p => ({ ...p, profilePic: pic }));
    } catch (e) {
      console.log('Error profile pic -> ', e);
      setState(p => ({ ...p, profilePic: Images.defaultUser }));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContentContainer}>
        <RNImage source={State.profilePic} style={styles.userImage} />
        <View style={styles.content}>
          <RNText pBottom={hp(1)} size={FontSize.font12} color={Colors.Primary}>
            {item?.employee?.displayName}
          </RNText>
          <Row title={'In Time : '} text={inTime} icon={Images.inTime} />
          <Row title={'Out Time : '} text={outTime} icon={Images.outTime} />
          <Row title={'Shift : '} text={item?.shiftName} />
          <RNText
            size={FontSize.font10}
            pTop={hp(0.5)}
            color={
              Colors.employee
            }>{`${item?.departmentName}  |  ${item?.designation}`}</RNText>
        </View>
      </View>

      <View style={styles.presentContainer}>
        <RNText
          family={FontFamily.Medium}
          size={FontSize.font14}
          color={regular[item.dayFlag]?.color}>
          {regular[item.dayFlag]?.key}
        </RNText>
      </View>
    </View>
  );
};

const Row = ({ title, text, icon }) => {
  const styles = useStyles({});

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowTextContainer}>
        <RNText size={FontSize.font10} color={Colors.employee}>
          {title}
        </RNText>
        <RNText size={FontSize.font10}>{text}</RNText>
      </View>
      {icon && <RNImage source={icon} style={styles.inOutIcon} />}
    </View>
  );
};

const imgSize = wp(15);
const presendSize = wp(8);
const useStyles = ({ color }) => {
  return StyleSheet.create({
    container: {
      ...RNStyles.shadow,
      flexDirection: 'row',
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
    content: {
      flex: 1,
    },
    rowContainer: {
      ...RNStyles.flexRow,
      paddingVertical: hp(0.5),
    },
    rowTextContainer: {
      ...RNStyles.flexRow,
      width: '45%',
    },
    inOutIcon: {
      width: wp(3),
      height: wp(3),
      marginHorizontal: wp(2),
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
  });
};

export default LIAttendence;
