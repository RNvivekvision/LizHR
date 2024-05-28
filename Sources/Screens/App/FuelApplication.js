import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';
import { LIApplication, LIDatePicker } from '../../Components';
import { useFlatlistStyles } from '../../Hooks';
import { Functions } from '../../Utils';
import { onFuelApplication } from '../../Services';
import { Colors } from '../../Theme';

const FuelApplication = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();

  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    fuels: [],
  });

  useEffect(() => {
    getAllFuelApplications();
  }, [State.start, State.end]);

  const getAllFuelApplications = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onFuelApplication({
        fromDate: State.start,
        toDate: State.end,
      });
      setState(p => ({ ...p, fuels: response?.responseData }));
    } catch (e) {
      console.log('Error getAllFuelApplications -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getAllFuelApplications(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer>
      <RNHeader title={'Fuel Application'} />

      <FlatList
        data={State.fuels}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={
          <LIDatePicker
            onDateChange={d =>
              setState(p => ({ ...p, start: d.start, end: d.end }))
            }
          />
        }
        renderItem={({ item }) => <LIApplication item={item} type={0} />}
        refreshControl={
          <RefreshControl
            refreshing={State.refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.Primary}
            colors={[Colors.Primary]}
          />
        }
      />
    </RNContainer>
  );
};

export default FuelApplication;
