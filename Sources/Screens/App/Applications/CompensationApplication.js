import { LIApplication } from '../../../Components';
import { onCompansationApplication } from '../../../Services';

const CompensationApplication = () => {
  return (
    <LIApplication
      title={'Compensation Application'}
      apiCallFunc={onCompansationApplication}
      type={2}
    />
  );
};

export default CompensationApplication;
