import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { LIApplication, LIDatePicker } from '../../Components';
import { onCompansationApplication } from '../../Services';
import { RNContainer, RNHeader } from '../../Common';
import { useFlatlistStyles } from '../../Hooks';
import { Functions } from '../../Utils';
import { Colors } from '../../Theme';

const CompensationApplication = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    compansations: [],
  });

  useEffect(() => {
    getAllComApplications();
  }, [State.start, State.end]);

  // console.log('State -> ', JSON.stringify(State, null, 2));
  const getAllComApplications = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await onCompansationApplication({
        fromDate: State.start,
        toDate: State.end,
      });
      setState(p => ({ ...p, compansations: response.responseData }));
    } catch (e) {
      console.log('Error getAllComApplications -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getAllComApplications(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  const onDateChange = useCallback(d => {
    setState(p => ({ ...p, start: d.start, end: d.end }));
  }, []);

  const Header = useCallback(() => {
    return <LIDatePicker onDateChange={onDateChange} />;
  }, []);

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={'Compensation Application'} />

      <FlatList
        // data={employeeLeaves}
        data={State.compansations}
        keyExtractor={(v, i) => String(i)}
        ListHeaderComponent={<Header />}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <LIApplication item={item} type={2} />}
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

export default CompensationApplication;
