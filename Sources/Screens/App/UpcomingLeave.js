import { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RNCalendar,
  RNContainer,
  RNHeader,
  RNImage,
  RNStyles,
  RNText,
} from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RenderUpcomingLeave } from '../../Components';
import { onUpcomingLeave } from '../../Services';
import { DummyData, Functions } from '../../Utils';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';

const { employeeLeaves } = DummyData.upcomingLeaves;

const UpcomingLeave = () => {
  const styles = useStyles();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    date: new Date(),
    openDatePicker: false,
    upcomingLeaves: [],
  });

  useEffect(() => {
    getUpcomingleaves();
  }, [State.date]);

  // console.log('State -> ', JSON.stringify(State, null, 2));
  const getUpcomingleaves = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onUpcomingLeave({
        toDate: State.date,
      });
      console.log(JSON.stringify({ response }, null, 2));
      setState(p => ({ ...p, upcomingLeaves: response?.responseData }));
    } catch (e) {
      console.log('Error getUpcomingleaves -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getUpcomingleaves(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  const onDateSelect = d => {
    setState(p => ({ ...p, date: d, openDatePicker: false }));
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={'Upcoming Leave'} />

      <FlatList
        data={State.upcomingLeaves}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => (
          <ListHeaderComponent
            item={{
              date: State.date,
              employees: State.upcomingLeaves.length,
            }}
            onPress={() => setState(p => ({ ...p, openDatePicker: true }))}
          />
        )}
        renderItem={({ item }) => <RenderUpcomingLeave item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={State.refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.Primary}
            colors={[Colors.Primary]}
          />
        }
      />

      <RNCalendar
        visible={State.openDatePicker}
        isSingle={true}
        onDateSelect={onDateSelect}
        onClose={() => setState(p => ({ ...p, openDatePicker: false }))}
      />
    </RNContainer>
  );
};

const ListHeaderComponent = ({ item, onPress }) => {
  const styles = useStyles();
  const date = Functions.formatDate(item?.date);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.totalContainer}>
      <View style={RNStyles.flexRowBetween}>
        <View style={{ flex: 1 }}>
          <RNText size={FontSize.font12}>{'Total Upcoming Leave'}</RNText>
          <RNText size={FontSize.font10} color={Colors.employee}>
            {date}
          </RNText>
        </View>
        <View style={styles.iconContainer}>
          <RNImage source={Images.calendar} style={RNStyles.image70} />
        </View>
      </View>

      <RNText
        size={FontSize.font18}
        pTop={hp(1)}
        family={FontFamily.Bold}
        color={Colors.Primary}>
        {item?.employees}
      </RNText>
      <RNText size={FontSize.font12} color={Colors.employee}>
        {'Employee On Leave'}
      </RNText>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    totalContainer: {
      ...RNStyles.shadow,
      backgroundColor: Colors.White,
      marginHorizontal: wp(4),
      marginVertical: hp(3),
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
      borderRadius: wp(4),
    },
    iconContainer: {
      ...RNStyles.center,
      width: wp(8),
      height: wp(8),
      backgroundColor: Colors.dropDownYear,
      borderRadius: wp(2),
    },
    contentContainerStyle: {
      paddingBottom: inset.bottom + hp(1),
    },
  });
};

export default UpcomingLeave;
