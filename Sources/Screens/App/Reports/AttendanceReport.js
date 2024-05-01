import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIDatePicker } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';

const AttendanceReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();

  return (
    <RNContainer>
      <RNHeader title={'Attendance Report'} />

      <FlatList
        data={[]}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={() => <LIDatePicker />}
        // renderItem={({ item }) => {}}
      />
    </RNContainer>
  );
};

export default AttendanceReport;
