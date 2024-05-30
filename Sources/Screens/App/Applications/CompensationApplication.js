import { LIApplication } from '../../../Components';
import { onCompansationApplication } from '../../../Services';

const CompensationApplication = () => {
  return (
    <LIApplication
      title={'Compensation Application'}
      apiCallFunc={onCompansationApplication}
    />
  );
};

export default CompensationApplication;
