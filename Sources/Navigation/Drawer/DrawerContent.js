import { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RNButton, RNIcon, RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';
import { DummyData, Functions } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/Actions';
import NavRoutes from '../NavRoutes';

const DrawerContent = ({ navigation }) => {
  const { userData } = useSelector(({ UserReducer }) => UserReducer);
  const styles = useStyles({});
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
    navigation.closeDrawer();
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
      // navigation.replace(NavRoutes.Login);
      navigation.reset({
        index: 0,
        routes: [{ name: NavRoutes.Login }],
      });
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
        renderItem={({ item }) => (
          <RenderDrawerItems item={item} onPress={onItemPress} />
        )}
      />

      {/* <Button title="Logout" onPress={onLogoutPress} /> */}
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

const RenderDrawerItems = ({ item, onPress }) => {
  const [State, setState] = useState({ showInner: false });
  const styles = useStyles({ isInner: !item.icon });

  const onItemPress = () => {
    if (item?.data?.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setState(p => ({ ...p, showInner: !p.showInner }));
    } else {
      onPress?.(item);
    }
  };

  return (
    <View style={styles.renderContainer}>
      <TouchableOpacity
        onPress={onItemPress}
        style={styles.renderContentContainer}>
        <View style={RNStyles.flexRow}>
          {item.icon && (
            <View style={styles.renderIcon}>
              <RNImage source={item.icon} style={RNStyles.image50} />
            </View>
          )}
          <RNText style={styles.renderTitle}>{item.title}</RNText>
        </View>
        {item?.data?.length > 0 && (
          <RNImage
            source={Images.back}
            style={[
              styles.dropDownIcon,
              {
                transform: [{ rotate: State.showInner ? '90deg' : '-90deg' }],
              },
            ]}
          />
        )}
      </TouchableOpacity>

      {State.showInner &&
        item?.data?.map((v, i) => (
          <RenderDrawerItems item={v} key={i} onPress={onPress} />
        ))}
    </View>
  );
};

const profilePicSize = wp(10);
const useStyles = ({ isInner }) => {
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
    renderContainer: {
      marginLeft: isInner ? wp(8) : wp(4),
    },
    renderContentContainer: {
      ...RNStyles.flexRowBetween,
      // marginLeft: wp(4),
      paddingVertical: hp(1.5),
      borderBottomWidth: isInner ? 0 : 1,
      borderBlockColor: Colors.drawerBorderColor,
      paddingRight: wp(4),
    },
    renderIcon: {
      ...RNStyles.center,
      width: wp(8),
      height: wp(8),
      borderRadius: 100,
      backgroundColor: Colors.drawerIconBgColor,
    },
    renderTitle: {
      paddingHorizontal: wp(4),
      fontSize: isInner ? FontSize.font12 : FontSize.font14,
    },
    dropDownIcon: {
      ...RNStyles.icon,
      tintColor: Colors.Black,
      transform: [{ rotate: '-90deg' }],
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
