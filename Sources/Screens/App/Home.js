import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RNContainer, RNDropDown, RNHeader, RNImage } from '../../Common';
import { PresentAbsent, LocationWise, LateEarly } from '../../Components';
import { Colors, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBranches,
  getAllLateEarly,
  getAllLocationWise,
  getAllPresentAbsent,
} from '../../Redux/ExtraReducers';

const Home = () => {
  const { branches, userData } = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();
  const styles = useStyles();
  const [State, setState] = useState({
    branches: [],
    branch: null,
    profilePic: null,
  });

  useEffect(() => {
    if (!userData?.user) return;
    dispatch(getAllBranches());
    init();
  }, []);

  const init = () => {
    dispatch(getAllPresentAbsent({ toDate: new Date() }));
    dispatch(getAllLocationWise({ toDate: new Date() }));
    dispatch(getAllLateEarly({ toDate: new Date() }));
  };

  useEffect(() => {
    if (!branches?.length > 0) return;
    const b = branches?.map(v => ({
      ...v,
      label: v?.companyName,
      value: v?.id,
    }));
    setState(p => ({ ...p, branches: b, branch: b[0]?.value }));
  }, [branches]);

  const onBranchChange = ({ value }) => {
    setState(p => ({ ...p, branch: value }));
    setTimeout(init, 500);
  };

  return (
    <RNContainer>
      <RNImage
        source={Images.background}
        resizeMode={'cover'}
        style={styles.bgImage}
      />

      <RNHeader title={'LizHR'} isDrawer={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <RNDropDown
            placeholder={'Select Branch'}
            data={State.branches}
            dropdownStyle={styles.searchDropDown}
            value={State.branch}
            onChange={onBranchChange}
          />

          <PresentAbsent />

          <LocationWise />

          <LateEarly />
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
