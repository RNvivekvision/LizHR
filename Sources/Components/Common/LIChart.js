import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCalendar, RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Functions } from '../../Utils';
import { Images } from '../../Constants';
import { ChartLoader } from '../App/Charts';

const LIChart = ({ title, isLoading, chart, onDateChange }) => {
  const [State, setState] = useState({ date: new Date(), picker: false });

  return (
    <View style={styles.Container}>
      <View style={RNStyles.flexRowBetween}>
        <RNText family={FontFamily.Medium} size={FontSize.font18}>
          {title}
        </RNText>

        <TouchableOpacity
          onPress={() => setState(p => ({ ...p, picker: true }))}
          activeOpacity={0.6}
          style={styles.dateContainer}>
          <RNImage source={Images.calendar} style={RNStyles.icon} />
          <RNText color={Colors.Black} pLeft={wp(2)} size={FontSize.font12}>
            {Functions.formatDate(State.date)}
          </RNText>
        </TouchableOpacity>
      </View>

      <ChartLoader visible={isLoading}>{chart}</ChartLoader>

      <RNCalendar
        isSingle={true}
        visible={State.picker}
        onClose={() => setState(p => ({ ...p, picker: false }))}
        onDateSelect={d => {
          onDateChange?.(d);
          setState(p => ({ ...p, picker: false, date: d }));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    borderRadius: wp(5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  dateContainer: {
    ...RNStyles.flexRow,
    backgroundColor: Colors.dropDownYear,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(3),
  },
});

export default LIChart;
