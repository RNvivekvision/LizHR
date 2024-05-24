import { useEffect, useState } from 'react';
import { Functions } from '../Utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions';

const useLocalStorage = () => {
  const [State, setState] = useState({ appData: null });
  const dispatch = useDispatch();

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  const getDataFromLocalStorage = async () => {
    try {
      const appdata = await Functions.getAppData('appdata');
      if (appdata !== null) {
        setState(p => ({ ...p, appData: appdata }));
        dispatch(setUser(appdata));
      }
    } catch (e) {
      console.log('Error getDataFromLocalStorage -> ', e);
    }
  };

  return State;
};

export default useLocalStorage;
