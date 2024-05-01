import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';
import { LIDatePicker, LIApplication } from '../../Components';
import { DummyData } from '../../Utils';
import { useFlatlistStyles } from '../../Hooks';

const { employeeLeaves } = DummyData.leaveApplication;

const LeaveApplication = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  return (
    <RNContainer>
      <RNHeader title={'Leave Application'} />

      <FlatList
        data={employeeLeaves}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={() => <LIDatePicker />}
        renderItem={({ item }) => <LIApplication item={item} />}
      />
    </RNContainer>
  );
};

export default LeaveApplication;
