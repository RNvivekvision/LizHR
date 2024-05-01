import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIDatePicker, RenderInOut } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';
import { DummyData } from '../../../Utils';

const { employeeInoutReport } = DummyData.inOutReport;
const InOutReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();

  return (
    <RNContainer>
      <RNHeader title={'In-Out Reports'} />

      <FlatList
        data={[...employeeInoutReport, ...employeeInoutReport]}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={() => <LIDatePicker />}
        renderItem={({ item }) => <RenderInOut item={item} />}
      />
    </RNContainer>
  );
};

export default InOutReport;
