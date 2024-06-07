import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { RNContainer, RNHeader, RNSegment } from '../../Common';
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
    appStatus: 0,
    start: start,
    end: end,
    data: [],
  });

  useEffect(() => {
    getData();
  }, [State.start, State.end, State.appStatus]);

  const getData = async isRefreshing => {
    !isRefreshing && setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await apiCallFunc({
        appStatus: State.appStatus, //  0 = Request & 1 = Approve
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
        renderItem={({ item }) => (
          <RenderApplication
            item={item}
            type={type}
            refresh={State.refreshing}
            isRequested={State.appStatus === 0}
          />
        )}
        ListHeaderComponent={
          <ListHeaderComponent State={State} setState={setState} />
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

const ListHeaderComponent = ({ State, setState }) => {
  const isRequested = State.appStatus === 0;
  const requestLength =
    isRequested && State.data?.length > 0 ? State.data?.length : '';
  const approveLength =
    !isRequested && State.data?.length > 0 ? State.data?.length : '';

  const onChange = i => {
    if (State.appStatus === i) return;
    setState(p => ({ ...p, appStatus: i, data: [] }));
  };

  return (
    <View>
      <LIDatePicker
        onDateChange={d =>
          setState(p => ({ ...p, start: d.start, end: d.end }))
        }
      />

      <RNSegment
        segments={[`Request ${requestLength}`, `Approve ${approveLength}`]}
        selected={State.appStatus}
        onChange={onChange}
      />
    </View>
  );
};

export default LIApplication;
