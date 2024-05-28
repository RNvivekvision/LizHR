import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);

const OpenUrl = url => Linking.openURL(url);

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const formatDate = (date, format) => {
  return dayjs(date).format(format ?? 'DD-MMM-YYYY');
};

const Functions = {
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  formatDate,
};

export default Functions;
