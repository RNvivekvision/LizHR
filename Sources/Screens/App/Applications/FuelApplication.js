import { LIApplication } from '../../../Components';
import { onFuelApplication } from '../../../Services';

const FuelApplication = () => {
  return (
    <LIApplication
      title={'Fuel Application'}
      apiCallFunc={onFuelApplication}
      type={0}
    />
  );
};

export default FuelApplication;
