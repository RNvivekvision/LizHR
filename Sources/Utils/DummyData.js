import { Images } from '../Constants';
const DummyData = {
  drawerScreens: [
    {
      icon: Images.dashboard,
      title: 'Dashboard',
    },
    {
      icon: Images.upcomingLeave,
      title: 'Upcoming leave',
    },
    {
      icon: Images.reports,
      title: 'Reports',
      data: [
        {
          icon: Images.fuelApplication,
          title: 'Inner 1',
        },
        {
          icon: Images.leaveApplication,
          title: 'Inner 2',
        },
        {
          icon: Images.compensationApplication,
          title: 'Inner 3',
        },
      ],
    },
    {
      icon: Images.fuelApplication,
      title: 'Fuel Application',
    },
    {
      icon: Images.leaveApplication,
      title: 'Leave Application',
    },
    {
      icon: Images.compensationApplication,
      title: 'Compensation Application',
    },
  ],
};

export default DummyData;
