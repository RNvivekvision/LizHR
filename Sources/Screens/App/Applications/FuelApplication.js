import { LIApplication } from '../../../Components';
import { onFuelApplication } from '../../../Services';

const FuelApplication = () => {
  return (
    <LIApplication title={'Fuel Application'} apiCallFunc={onFuelApplication} />
  );
};

export default FuelApplication;
