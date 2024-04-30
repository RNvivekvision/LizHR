import { useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { StyleSheet, View } from 'react-native';
import { RNDropDown, RNImage, RNStyles, RNText } from '../../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../../Theme';
import { DummyData } from '../../../Utils';
import { Images } from '../../../Constants';

const { years } = DummyData.Home;

const AttendenceSummary = ({ summary }) => {
  const [State, setState] = useState({ year: null });

  return (
    <View style={styles.attendanceContainer}>
      <View style={RNStyles.flexRowBetween}>
        <View style={{ flex: 1 }}>
          <RNText size={FontSize.font12}>{'Attendance Summary'}</RNText>
          <RNText
            color={Colors.Black + '99'}
            pTop={hp(0.5)}
            size={FontSize.font9}>
            {'April 2023 to April 2024'}
          </RNText>
        </View>

        {/* <View style={{ paddingVertical: 15, width: '35%' }} /> */}
        <RNDropDown
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
      </View>

      <View style={styles.renderAttendenceContainer}>
        {summary.map((v, i) => (
          <View key={i} style={styles.renderAttendence}>
            <CircularProgress
              value={v.pecentage}
              radius={wp(8)}
              activeStrokeColor={v.color}
              inActiveStrokeColor={v.color}
              inActiveStrokeOpacity={0.2}
              activeStrokeWidth={wp(2)}
              inActiveStrokeWidth={wp(2)}
              duration={2000}
              progressValueStyle={styles.progressValueStyle}
              strokeLinecap={'round'}
              valueSuffix={'%'}
            />
            <RNText style={styles.progressTitle}>{v.title}</RNText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  attendanceContainer: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    borderRadius: wp(5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  renderAttendenceContainer: {
    ...RNStyles.flexRowBetween,
  },
  renderAttendence: {
    flex: 1,
    paddingTop: hp(2),
    alignItems: 'center',
  },
  progressValueStyle: {
    fontSize: FontSize.font12,
    fontFamily: FontFamily.Thin,
  },
  progressTitle: {
    fontSize: FontSize.font12,
    fontFamily: FontFamily.Medium,
    paddingTop: hp(1),
    paddingHorizontal: wp(5),
    textAlign: 'center',
  },
});

export default AttendenceSummary;
