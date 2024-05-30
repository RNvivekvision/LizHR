import { LIApplication } from '../../../Components';
import { onLeaveApplication } from '../../../Services';

const LeaveApplication = () => {
  return (
    <LIApplication
      title={'Leave Application'}
      apiCallFunc={onLeaveApplication}
      type={1}
    />
  );
};

export default LeaveApplication;
