import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCalendar, RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { Functions } from '../../Utils';

const LIDatePicker = ({ onDateChange }) => {
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    openDatePicker: false,
    startDate: start,
    endDate: end,
  });

  const onPress = () => {
    setState(p => ({ ...p, openDatePicker: true }));
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.container}>
        <View style={RNStyles.flexRow}>
          <RNText size={FontSize.font12}>{'Today : '}</RNText>
          <RNText size={FontSize.font12}>
            {Functions.formatDate(State.startDate) +
              ' - ' +
              Functions.formatDate(State.endDate)}
          </RNText>
        </View>

        <View style={styles.iconContainer}>
          <RNImage source={Images.calendar} style={RNStyles.image60} />
        </View>
      </TouchableOpacity>
      <RNCalendar
        visible={State.openDatePicker}
        onDateSelect={d => {
          setState(p => ({
            ...p,
            openDatePicker: false,
            startDate: d.start,
            endDate: d.end,
          }));
          onDateChange?.(d);
        }}
        onClose={() => setState(p => ({ ...p, openDatePicker: false }))}
      />
    </>
  );
};

const iconSize = wp(9);
const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRowBetween,
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    marginHorizontal: wp(4),
    marginVertical: hp(3),
    paddingLeft: wp(4),
    paddingRight: wp(2),
    paddingVertical: hp(1),
    borderRadius: wp(4),
  },
  iconContainer: {
    ...RNStyles.center,
    width: iconSize,
    height: iconSize,
    backgroundColor: Colors.dropDownYear,
    borderRadius: wp(3),
  },
});

export default LIDatePicker;
