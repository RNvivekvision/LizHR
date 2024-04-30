import { FontFamily, FontSize } from './Fonts';
import { hp, wp } from './Responsive';

const Colors = {
  Black: '#262626',
  White: '#ffffff',
  Transparent: 'transparent',
  Primary: '#0173EC',
  InputTitle: '#7C8899',
  Placeholder: '#D3D3D3',
  Error: '#b01313',
  drawerBorderColor: '#EDEDED',
  drawerIconBgColor: '#f3f3f3',
  attendence: '#2464E7',
  present: '#62BA02',
  absent: '#EF0204',
  employee: '#878787',
  dropDownYear: '#E9F0FF',
};

export const otpTheme = {
  containerStyle: {
    paddingVertical: hp(2),
  },
  pinCodeContainerStyle: {
    backgroundColor: Colors.White,
    width: wp(13),
    height: wp(15),
    borderRadius: wp(2),
    borderColor: Colors.Placeholder,
  },
  pinCodeTextStyle: {
    fontSize: FontSize.font24,
    fontFamily: FontFamily.Bold,
    color: Colors.Black,
  },
  focusStickStyle: {
    backgroundColor: Colors.Primary,
  },
  focusedPinCodeContainerStyle: {
    borderColor: Colors.Primary,
  },
};

export default Colors;
