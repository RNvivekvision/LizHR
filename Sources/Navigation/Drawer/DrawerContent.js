import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily, hp, wp } from '../../Theme';
import { RNIcon, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';
import { DummyData, Functions } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/Actions';
import NavRoutes from '../NavRoutes';
import RenderDrawer from './RenderDrawer';

const DrawerContent = ({ navigation }) => {
  const { userData } = useSelector(({ UserReducer }) => UserReducer);
  const styles = useStyles();
  const dispatch = useDispatch();
  const username = userData?.user?.UserName;
  const profilePic = userData?.user?.ProfileImageUri || Images.defaultUser;

  const onItemPress = item => {
    if (item.navigate) {
      navigation.closeDrawer();
      setTimeout(() => {
        navigation.navigate(item.navigate);
      }, 0);
    }
  };

  const onLogoutPress = () => {
    Functions.ALERT({
      Title: 'Logout',
      Text: 'Are you sure you want to logout?',
      Buttons: [
        { text: 'Yes', onPress: logout },
        { text: 'No', onPress: () => null },
      ],
    });
  };

  const logout = async () => {
    try {
      await Functions.setAppData({ user: null });
      dispatch(setUser({}));
      await navigation.closeDrawer();
      setTimeout(() => {
        navigation.replace(NavRoutes.Login);
      }, 500);
    } catch (e) {
      console.log('Error onLogoutPress -> ', e);
    }
  };

  return (
    <View style={RNStyles.container}>
      <View style={styles.headerContainer}>
        <View style={{ ...RNStyles.flexRow, flex: 1 }}>
          <RNIcon
            icon={Images.back}
            iconStyle={{ tintColor: Colors.Black }}
            containerStyle={styles.backIcon}
            onPress={() => navigation.closeDrawer()}
          />
          <RNText pLeft={wp(2)} family={FontFamily.Bold}>
            {username}
          </RNText>
        </View>
        <Image
          source={profilePic}
          resizeMode={'cover'}
          style={styles.profilePic}
        />
      </View>

      <FlatList
        data={DummyData.drawerScreens}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={{ paddingVertical: hp(1) }}
        renderItem={({ item, index }) => (
          <RenderDrawer item={item} index={index} onPress={onItemPress} />
        )}
      />

      <TouchableOpacity
        onPress={onLogoutPress}
        activeOpacity={0.6}
        style={styles.logout}>
        <RNText family={FontFamily.Bold} color={Colors.White}>
          {'Logout'}
        </RNText>
      </TouchableOpacity>
    </View>
  );
};

const profilePicSize = wp(10);
const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    headerContainer: {
      ...RNStyles.flexRow,
      paddingTop: inset.top + hp(2),
      paddingVertical: hp(2),
      borderBottomWidth: 1,
      borderBlockColor: Colors.drawerBorderColor,
      paddingHorizontal: wp(4),
    },
    backIcon: {
      width: wp(8),
      height: wp(8),
    },
    logout: {
      ...RNStyles.center,
      paddingVertical: hp(1.2),
      marginBottom: inset.bottom + hp(1),
      marginHorizontal: wp(2),
      borderRadius: wp(2),
      backgroundColor: Colors.Error,
    },
    profilePic: {
      ...RNStyles.center,
      width: profilePicSize,
      height: profilePicSize,
      borderRadius: 100,
    },
  });
};

export default DrawerContent;
