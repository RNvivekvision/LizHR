import { FlatList, StyleSheet, View } from 'react-native';
import { RNContainer, RNHeader, RNImage, RNStyles, RNText } from '../../Common';
import { RenderUpcomingLeave } from '../../Components';
import { DummyData } from '../../Utils';
import { Images } from '../../Constants';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { useInset } from '../../Hooks';

const { employeeLeaves } = DummyData.upcomingLeaves;
const UpcomingLeave = () => {
  const styles = useStyles();

  return (
    <RNContainer>
      <RNHeader title={'Upcoming Leave'} />

      <FlatList
        data={employeeLeaves}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => <ListHeaderComponent />}
        renderItem={({ item }) => <RenderUpcomingLeave item={item} />}
      />
    </RNContainer>
  );
};

const ListHeaderComponent = () => {
  const styles = useStyles();
  return (
    <View style={styles.totalContainer}>
      <View style={RNStyles.flexRowBetween}>
        <View style={{ flex: 1 }}>
          <RNText size={FontSize.font12}>{'Total Upcoming Leave'}</RNText>
          <RNText size={FontSize.font10} color={Colors.employee}>
            {'19 - Apr - 2024'}
          </RNText>
        </View>
        <View style={styles.iconContainer}>
          <RNImage source={Images.calendar} style={RNStyles.image70} />
        </View>
      </View>

      <RNText
        size={FontSize.font18}
        pTop={hp(1)}
        family={FontFamily.Bold}
        color={Colors.Primary}>
        {'12'}
      </RNText>
      <RNText size={FontSize.font12} color={Colors.employee}>
        {'Employee On Leave'}
      </RNText>
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    totalContainer: {
      ...RNStyles.shadow,
      backgroundColor: Colors.White,
      marginHorizontal: wp(4),
      marginVertical: hp(3),
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
      borderRadius: wp(4),
    },
    iconContainer: {
      ...RNStyles.center,
      width: wp(8),
      height: wp(8),
      backgroundColor: Colors.dropDownYear,
      borderRadius: wp(2),
    },
    contentContainerStyle: {
      paddingBottom: inset.bottom + hp(1),
    },
  });
};

export default UpcomingLeave;
