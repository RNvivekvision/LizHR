import { FlatList } from 'react-native';
import { RNContainer, RNHeader } from '../../../Common';
import { LIDatePicker } from '../../../Components';
import { useFlatlistStyles } from '../../../Hooks';

const InOutReport = () => {
  const { contentContainerStyle } = useFlatlistStyles();

  return (
    <RNContainer>
      <RNHeader title={'In-Out Reports'} />

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

export default InOutReport;
