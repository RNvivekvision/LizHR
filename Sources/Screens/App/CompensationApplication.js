import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';
import { LIApplication, LIDatePicker } from '../../Components';
import { useFlatlistStyles } from '../../Hooks';
import { DummyData } from '../../Utils';

const { employeeLeaves } = DummyData.leaveApplication;

const CompensationApplication = () => {
  const { contentContainerStyle } = useFlatlistStyles();
  return (
    <RNContainer>
      <RNHeader title={'Compensation Application'} />

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

export default CompensationApplication;
