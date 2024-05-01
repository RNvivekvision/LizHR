import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIAttendence, LIDatePicker } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';
import { DummyData } from '../../../Utils';

const { employeeAttendence } = DummyData.attendence;

const AttendanceReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();

  return (
    <RNContainer>
      <RNHeader title={'Attendance Report'} />

      <FlatList
        data={[...employeeAttendence, ...employeeAttendence]}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={() => <LIDatePicker />}
        renderItem={({ item }) => <LIAttendence item={item} />}
      />
    </RNContainer>
  );
};

export default AttendanceReport;
