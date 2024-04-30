import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RNContainer, RNDropDown, RNHeader, RNImage } from '../../Common';
import { AttendenceSummary, EmployeeDetails } from '../../Components';
import { Colors, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { DummyData } from '../../Utils';
import { useInset } from '../../Hooks';

const { attendenceSummary, branches, employeeData } = DummyData.Home;

const Home = () => {
  const [State, setState] = useState({ branch: null });
  const styles = useStyles();

  return (
    <RNContainer>
      <RNImage
        source={Images.background}
        resizeMode={'cover'}
        style={styles.bgImage}
      />
      <RNHeader title={'LizHR'} isDrawer={true} />

      <ScrollView>
        <View style={styles.content}>
          <RNDropDown
            placeholder={'Select Branch'}
            data={branches}
            dropdownStyle={styles.searchDropDown}
            value={State.branch}
            onChange={({ value }) => setState(p => ({ ...p, branch: value }))}
          />

          <AttendenceSummary summary={attendenceSummary} />

          <EmployeeDetails details={employeeData} />
        </View>
      </ScrollView>
    </RNContainer>
  );
};

const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    bgImage: {
      position: 'absolute',
      width: '100%',
      height: wp(70),
      backgroundColor: Colors.Primary,
      borderBottomLeftRadius: wp(5),
      borderBottomRightRadius: wp(5),
    },
    content: {
      paddingHorizontal: wp(4),
      paddingBottom: inset.bottom,
    },
    searchDropDown: {
      borderRadius: 10,
      marginVertical: hp(1),
    },
  });
};

export default Home;
