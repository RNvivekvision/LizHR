import { FlatList, StyleSheet, View } from 'react-native';
import { RNContainer, RNHeader } from '../../Common';

const Attendance = () => {
  return (
    <RNContainer>
      <RNHeader title={'Attendance'} />

      <FlatList
        data={[]}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => <ListHeaderComponent />}
        // renderItem={({ item }) => <RenderUpcomingLeave item={item} />}
      />
    </RNContainer>
  );
};

const ListHeaderComponent = () => {
  return <View></View>;
};

const styles = StyleSheet.create({});

export default Attendance;
