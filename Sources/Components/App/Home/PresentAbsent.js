import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCalendar, RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../../Theme';
import { DummyData, Functions } from '../../../Utils';
import { Images } from '../../../Constants';
import { ChartLoader, PieChart } from '../Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPresentAbsent } from '../../../Redux/ExtraReducers';

const { pieChartData } = DummyData.Home;

const PresentAbsent = () => {
  const { presentAbsent, presentAbsentLoading } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();
  const [State, setState] = useState({
    width: 100,
    height: 100,
    date: new Date(),
    openDatePicker: false,
    data: pieChartData,
  });

  useEffect(() => {
    const update = State.data.map(v => {
      const value = presentAbsent?.[v.key] ?? 0;
      return { ...v, employees: value };
    });
    setState(p => ({ ...p, data: update }));
  }, [presentAbsent]);

  return (
    <View style={styles.Container}>
      <View style={RNStyles.flexRowBetween}>
        <RNText family={FontFamily.Medium} size={FontSize.font18}>
          {'Present/Absent'}
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
          setState(p => ({ ...p, width: nativeEvent.layout.width }))
        }>
        <ChartLoader visible={presentAbsentLoading}>
          <PieChart
            data={State.data}
            width={State.width}
            accessor={'employees'}
          />
        </ChartLoader>
      </View>

      <RNCalendar
        isSingle={true}
        visible={State.openDatePicker}
        onClose={() => setState(p => ({ ...p, openDatePicker: false }))}
        onDateSelect={d => {
          dispatch(getAllPresentAbsent({ toDate: d }));
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
  },
  dateContainer: {
    ...RNStyles.flexRow,
    backgroundColor: Colors.dropDownYear,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(3),
  },
});

export default PresentAbsent;

{
  /* <RNDropDown
          placeholder={'This Year'}
          data={years}
          dropdownStyle={styles.dropdown}
          dropDownIconStyle={RNStyles.icon}
          dropdownPlaceholderStyle={{ fontSize: FontSize.font12 }}
          renderLeftIcon={() => (
            <RNImage source={Images.calendar} style={styles.dropDownIcon} />
          )}
          value={State.year}
          onChange={({ value }) => setState(p => ({ ...p, year: value }))}
        /> 

        dropdown: {
    width: wp(33),
    backgroundColor: Colors.dropDownYear,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: wp(2),
  },
  dropDownIcon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(2),
  },
        
        */
}
