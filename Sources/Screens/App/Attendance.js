import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';
import { LIDatePicker, LIAttendence } from '../../Components';
import { DummyData } from '../../Utils';
import { useFlatlistStyles } from '../../Hooks';

const { employeeAttendence } = DummyData.attendence;

const Attendance = () => {
  const { contentContainerStyle } = useFlatlistStyles();

  return (
    <RNContainer>
      <RNHeader title={'Attendance'} />

      <FlatList
        data={[...employeeAttendence, ...employeeAttendence]}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={() => <LIDatePicker isSingle={true} />}
        renderItem={({ item }) => <LIAttendence item={item} />}
      />
    </RNContainer>
  );
};

export default Attendance;
