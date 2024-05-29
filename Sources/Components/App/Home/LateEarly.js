import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCalendar, RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../../Theme';
import { Functions } from '../../../Utils';
import { Images } from '../../../Constants';
import { BarChart, ChartLoader } from '../Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLateEarly } from '../../../Redux/ExtraReducers';

const LateEarly = () => {
  const { lateEarlyLoading, lateEarly } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();
  const [State, setState] = useState({
    width: 100,
    data: [],
    openDatePicker: false,
    date: new Date(),
  });

  useEffect(() => {
    if (!lateEarly?.length > 0) return;
    const obj = lateEarly?.find(v => {
      const d = Functions.formatDate(v.eventDate);
      const today = Functions.formatDate(State.date);
      return d === today;
    });
    setState(p => ({
      ...p,
      data: [obj?.lateCount, obj?.earlyCount, obj?.missingThumbCount],
    }));
  }, [lateEarly]);

  return (
    <View style={styles.Container}>
      <View style={RNStyles.flexRowBetween}>
        <RNText family={FontFamily.Medium} size={FontSize.font18}>
          {'Late/Early'}
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
        <ChartLoader visible={lateEarlyLoading}>
          <BarChart
            labels={['Late In', 'Early Out', 'Missing Thumb']}
            data={State.data}
            width={State.width}
          />
        </ChartLoader>
      </View>

      <RNCalendar
        isSingle={true}
        visible={State.openDatePicker}
        onClose={() => setState(p => ({ ...p, openDatePicker: false }))}
        onDateSelect={d => {
          dispatch(getAllLateEarly({ toDate: d }));
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

export default LateEarly;
