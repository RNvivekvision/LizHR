import { useEffect, useState } from 'react';
import { DummyData, Functions } from '../../../Utils';
import { PieChart } from '../Charts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPresentAbsent } from '../../../Redux/ExtraReducers';
import { LIChart } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../../Redux/Actions';
import { NavRoutes } from '../../../Navigation';

const { pieChartData } = DummyData.Home;

const PresentAbsent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [State, setState] = useState({ data: pieChartData });
  const { presentAbsent, presentAbsentLoading } = useSelector(
    ({ UserReducer }) => UserReducer,
  );

  useEffect(() => {
    if (presentAbsent?.status === 401) return unauthorized();
  }, [presentAbsent?.status]);

  useEffect(() => {
    const update = State.data.map(v => {
      const value = presentAbsent?.[v.key] ?? 0;
      return { ...v, employees: value };
    });
    setState(p => ({ ...p, data: update }));
  }, [presentAbsent]);

  const unauthorized = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavRoutes.Login }],
    });
    Functions.setAppData({ user: null });
    dispatch(setUser({}));
  };

  return (
    <LIChart
      title={'Present/Absent'}
      isLoading={presentAbsentLoading}
      chart={<PieChart data={State.data} accessor={'employees'} />}
      onDateChange={d => dispatch(getAllPresentAbsent({ toDate: d }))}
    />
  );
};

export default PresentAbsent;
