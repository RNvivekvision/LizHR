import { StyleSheet, View } from 'react-native';
import { RNContainer, RNHeader, RNImage } from '../../Common';
import { Images } from '../../Constants';
import { Colors, wp } from '../../Theme';

const Home = () => {
  return (
    <RNContainer>
      <RNImage
        source={Images.background}
        resizeMode={'cover'}
        style={styles.bgImage}
      />
      <RNHeader title={'LizHR'} isDrawer={true} />

      <View style={styles.content}></View>
    </RNContainer>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: wp(70),
    backgroundColor: Colors.Primary,
    borderBottomLeftRadius: wp(15),
    borderBottomRightRadius: wp(15),
  },
  content: {
    paddingHorizontal: wp(4),
  },
});

export default Home;
