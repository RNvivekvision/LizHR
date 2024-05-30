import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';
import { LIDatePicker, RenderApplication } from '../../Components';
import { Functions } from '../../Utils';
import { useFlatlistStyles } from '../../Hooks';
import { Colors } from '../../Theme';

const LIApplication = ({ title, apiCallFunc, type }) => {
  const { contentContainerStyle } = useFlatlistStyles();
  const { start, end } = Functions.getStartEndDates();
  const [State, setState] = useState({
    isLoading: false,
    refreshing: false,
    start: start,
    end: end,
    data: [],
  });

  useEffect(() => {
    getData();
  }, [State.start, State.end]);

  const getData = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await apiCallFunc({
        fromDate: State.start,
        toDate: State.end,
      });
      setState(p => ({ ...p, data: response?.responseData }));
    } catch (e) {
      console.log('Error getData LIApplication -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState(p => ({ ...p, refreshing: true }));
    await getData(true);
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={title} />
      <FlatList
        data={State.data}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => <RenderApplication item={item} type={type} />}
        ListHeaderComponent={
          <LIDatePicker
            onDateChange={d =>
              setState(p => ({ ...p, start: d.start, end: d.end }))
            }
          />
        }
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

export default LIApplication;
