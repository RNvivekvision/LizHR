import { StyleSheet, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontSize, hp, wp } from '../../../Theme';

const EmployeeDetails = ({ details }) => {
  return (
    <View style={styles.container}>
      {details.map((v, i) => (
        <RenderEmployeeDetails key={i} item={v} />
      ))}
    </View>
  );
};

const RenderEmployeeDetails = ({ item }) => {
  return (
    <View style={styles.renderContainer}>
      <View style={RNStyles.flexRow}>
        <View style={styles.iconContainer}>
          <RNImage source={item.icon} style={RNStyles.icon} />
        </View>
        <RNText style={styles.title}>{item.title}</RNText>
      </View>

      <View style={styles.empContainer}>
        <View style={{ flex: 5 }}>
          <RNText size={FontSize.font18} pBottom={hp(0.5)}>
            {item.employee}
          </RNText>
          <RNText size={FontSize.font12} color={Colors.employee}>
            {'Employees'}
          </RNText>
        </View>

        {item.wfh ? (
          <View style={{ flex: 2 }}>
            <RNText size={FontSize.font18} pBottom={hp(0.5)}>
              {item.wfh}
            </RNText>
            <RNText size={FontSize.font12} color={Colors.employee}>
              {'WFH'}
            </RNText>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexWrapHorizontal,
    marginVertical: hp(2),
  },
  renderContainer: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    width: '45%',
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
  },
  iconContainer: {
    ...RNStyles.center,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3),
    backgroundColor: Colors.drawerIconBgColor,
  },
  title: {
    flex: 1,
    fontSize: FontSize.font14,
    paddingHorizontal: wp(2),
    color: Colors.employee,
  },
  empContainer: {
    ...RNStyles.flexRow,
    paddingTop: hp(2),
    paddingHorizontal: wp(1),
  },
});

export default EmployeeDetails;
