import { FlatList } from 'react-native';
import { LIDatePicker, RenderSalaryReport } from '../../../Components';
import { RNContainer, RNHeader } from '../../../Common';
import { useFlatlistStyles } from '../../../Hooks';
import { DummyData } from '../../../Utils';

const { employeeSalaryReport } = DummyData.salaryReport;

const SalaryReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();

  return (
    <RNContainer>
      <RNHeader title={'Salary Report'} />

      <FlatList
        data={employeeSalaryReport}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={() => <LIDatePicker />}
        renderItem={({ item }) => <RenderSalaryReport item={item} />}
      />
    </RNContainer>
  );
};

export default SalaryReport;
