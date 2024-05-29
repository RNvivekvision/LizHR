import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCalendar, RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../../Theme';
import { Functions } from '../../../Utils';
import { Images } from '../../../Constants';
import { ChartLoader, StackChart } from '../Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocationWise } from '../../../Redux/ExtraReducers';

const LocationWise = () => {
  const { locationWiseLoading, locationWise } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();
  const [State, setState] = useState({
    date: new Date(),
    width: 100,
    labels: [],
    data: [[], []],
    openDatePicker: false,
  });

  useEffect(() => {
    const labels = locationWise?.map(v => v?.locationName);
    const data = locationWise?.map(v => [
      v?.totalPresent === 0 ? null : v?.totalPresent,
      v?.totalAbsent === 0 ? null : v?.totalAbsent,
      v?.totalLeave === 0 ? null : v?.totalLeave,
    ]);
    setState(p => ({ ...p, labels, data }));
  }, [locationWise]);

  return (
    <View style={styles.Container}>
      <View style={RNStyles.flexRowBetween}>
        <RNText family={FontFamily.Medium} size={FontSize.font18}>
          {'Location Wise'}
        </RNText>

        <TouchableOpacity
          onPress={() => setState(p => ({ ...p, openDatePicker: true }))}
          activeOpacity={0.6}
          style={styles.dateContainer}>
          <RNImage source={Images.calendar} style={RNStyles.icon} />
          <RNText color={Colors.Black} pLeft={wp(2)} size={FontSize.font12}>
            {Functions.formatDate(State.date)}
          </RNText>
        </TouchableOpacity>
      </View>

      <View
        onLayout={({ nativeEvent }) =>
          setState(p => ({
            ...p,
            width: nativeEvent.layout.width,
          }))
        }>
        <ChartLoader visible={locationWiseLoading}>
          <StackChart
            labels={State.labels}
            legend={['Present', 'Absent', 'Leave']}
            data={State.data}
            barColors={[
              Colors.chart.present,
              Colors.chart.absent,
              Colors.chart.leave,
            ]}
            width={State.width}
          />
        </ChartLoader>
      </View>

      <RNCalendar
        isSingle={true}
        visible={State.openDatePicker}
        onClose={() => setState(p => ({ ...p, openDatePicker: false }))}
        onDateSelect={d => {
          dispatch(getAllLocationWise({ toDate: d }));
          setState(p => ({ ...p, openDatePicker: false, date: d }));
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
    paddingTop: hp(2),
    paddingHorizontal: wp(4),
    marginVertical: hp(1),
  },
  dateContainer: {
    ...RNStyles.flexRow,
    backgroundColor: Colors.dropDownYear,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(3),
  },
});

export default LocationWise;
