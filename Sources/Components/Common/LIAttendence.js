import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';

const LIAttendence = ({ item }) => {
  const styles = useStyles({ ...item });

  return (
    <View style={styles.container}>
      <View style={styles.imageContentContainer}>
        <RNImage source={item.image} style={styles.userImage} />
        <View style={styles.content}>
          <RNText pBottom={hp(1)} size={FontSize.font12} color={Colors.Primary}>
            {item.name}
          </RNText>
          <Row title={'In Time : '} text={item.inTime} icon={Images.inTime} />
          <Row
            title={'Out Time : '}
            text={item.outTime}
            icon={Images.outTime}
          />
          <Row title={'Shift : '} text={item.shift} />
          <RNText
            size={FontSize.font10}
            pTop={hp(0.5)}
            color={
              Colors.employee
            }>{`${item.companyName} | ${item.position}`}</RNText>
        </View>
      </View>

      <View style={styles.presentContainer}>
        <RNText
          family={FontFamily.Medium}
          size={FontSize.font14}
          color={item.isPresent ? Colors.present : Colors.absent}>
          {item.isPresent ? 'P' : 'A'}
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
const useStyles = ({ isPresent }) => {
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
      width: '50%',
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
      borderColor: isPresent ? Colors.present : Colors.absent,
      backgroundColor: `${isPresent ? Colors.present : Colors.absent}` + '10',
    },
  });
};

export default LIAttendence;
